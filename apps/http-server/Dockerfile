FROM node:18-alpine

WORKDIR /app
RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

# Build ALL required packages
RUN pnpm turbo run build --filter=@repo/database
RUN pnpm turbo run build --filter=http-server

WORKDIR /apps/http-server
EXPOSE 3000

CMD ["pnpm", "start"]
