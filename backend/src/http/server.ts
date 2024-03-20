import fastify from 'fastify';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '../lib/cloudflare';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

app.post('/uploads', async (request) => {
  const uploadsBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-+.\w]+/),
  });

  const { name, contentType } = uploadsBodySchema.parse(request.body);

  const fileKey = randomUUID().concat('-').concat(name);

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: 'ups',
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 600 } // 10 minutos
  );

  const file = await prisma.file.create({
    data: {
      name,
      contentType,
      key: fileKey,
    },
  });

  return { signedUrl, fileId: file.id };
});

app.get('/uploads/:id', async (request) => {
  const getFileParamsShema = z.object({
    id: z.string().cuid(),
  });

  const { id } = getFileParamsShema.parse(request.params);

  const file = await prisma.file.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const signedUrl = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: 'ups',
      Key: file.key,
    }),
    { expiresIn: 600 } // 10 minutos
  );

  return { signedUrl };
});

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running!');
  });
