FROM node:18-alpine

WORKDIR /app
RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

# Let Turbo resolve dependency order
RUN pnpm turbo run build

WORKDIR /app/apps/http-server
EXPOSE 3000

CMD ["pnpm", "start"]