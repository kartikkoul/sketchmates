FROM node:18-alpine

WORKDIR /app
RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

# Build ALL required packages
RUN pnpm turbo run build --filter=ws-server

WORKDIR /app/apps/ws-server
EXPOSE 3000

CMD ["pnpm", "start"]
