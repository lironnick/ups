import { z } from 'zod';

// console.log('sssss: ', process.env);
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLOUDFLARE_ENDPOINT: z.string().url(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().url(),
  CLOUDFLARE_SECRET_KEY: z.string().url(),
});

export const env = envSchema.parse(process.env);
