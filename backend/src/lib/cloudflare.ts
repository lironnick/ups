import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../env';

const endpoint = String(process.env.CLOUDFLARE_ENDPOINT);
const accessKeyId = String(process.env.CLOUDFLARE_ACCESS_KEY_ID);
const secretAccessKey = String(process.env.CLOUDFLARE_SECRET_KEY);

// export const r2 = new S3Client({
//   region: 'auto',
//   endpoint: env.CLOUDFLARE_ENDPOINT,
//   credentials: {
//     accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
//     secretAccessKey: env.CLOUDFLARE_SECRET_KEY,
//   },
// });

export const r2 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
