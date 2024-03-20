# UPs

## Stack

- [NodeJs](https://nodejs.org)
- [Fastity](https://fastify.dev)
- [Prisma](https://www.prisma.io)
- [Cloudflare R2](https://developers.cloudflare.com/r2)
- [S3 request Presigner](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner/)
- [Vite react](https://vitejs.dev/guide/)

## Requisitos

### Requisitos Funcionais (RFs)

- [ ] Deve ser possivel realizar novos uploads;
- [ ] Deve ser possivel visualizar os últimos 5 uploads realizados;

### Regras de Negócio (RNs)

- [ ] Os uploads deve ser removidos automaticamente após 7 dias;
- [ ] Só deve ser possível visualizar uploads não expirados;
- [ ] Só deve ser possivel realizar uploads de arquivos seguros;
- [ ] Só deve ser possivel upload de arquvos ate 1gb cada;

### Requisitos Não Funcionais (RNFs)

- [ ] Ultilização do CloudFlare R2 para upload de arquivos;
- [ ] O upload deve ser feito diretamente pelo front-end utilizando Presigned URLs;
- [ ] Os liks para compartilhamento devem ser assinados evitando acesso público;

## Anotações importantes

### Mime Types

```ts
const bannedMimeTypes = [
  '.exe', // (executaveis)
  '.dll', // (bibliotecas dinamicas)
  '.bat', // (arquvos de lote)
  '.cmd', // (arquivos de camando)
  '.sh', // (scripts-shell)
  '.cgi', // (scripts-CGI)
  '.jar', // (arquivos Java)
  '.app', // (aplicativos macOs)
];
```

### Trecho de código

### Conexão com CloudFlare (AWS SKD)

```ts
import { S3Client } from '@aws-sdk/client-s3';

export const r2 = new S3Client({
  region: 'auto',
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: env.CLOUDFLARE_SECRET_KEY,
  },
});
```

### Upload no CloudFlare

```ts
const signedUrl = await getSignedUrl(
  r2,
  new PutObjectCommand({
    Bucket: 'bucket-name',
    Key: 'file.mp4',
    ContentType: 'video/mp4',
  }),
  { expiresIn: 600 }
);
```

```ts
await axios.put(uploadURL, file, {
  headers: {
    ContentType: file.type,
  },
});
```

## Exemplo

### gerar token

```CMD
http post :3333/uploads name=teste.mp4 contentType="video/mp4"
```

### upload

```CMD
http --form put "https://ups.8dff4de0f25fcccd4438b4d856c116d3.r2.cloudflarestorage.com/8702155b-73f4-4a34-8150-5c1499b1d8d7-teste.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=3c341f9819ceb10400b9823201208958%2F20240313%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240313T175749Z&X-Amz-Expires=600&X-Amz-Signature=1748bcaf943d59e5a940c78612c56bfb95a1caf2e97a9e0714e1c82da1b4e7f3&X-Amz-SignedHeaders=host&x-id=PutObject" file@aula.mp4 "Content-Type":"video/mp4"
```

### download

```CMD
http ":3333/uploads/cltq3tijc0000vcftlip98wwm"
```

### se for uma frontend ajusta o cors do bucket

esse exemplo é para desenvolvimento

```TS
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE"
    ],
    "AllowedHeaders": ["*"]
  }
]
```
