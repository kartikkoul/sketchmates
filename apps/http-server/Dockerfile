FROM node:18-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy repo
COPY . .

# Install deps
RUN pnpm install --frozen-lockfile

# Build ONLY http app
RUN pnpm turbo run build --filter=http-server

WORKDIR /app/apps/http-server

EXPOSE 3000

CMD ["pnpm", "start"]
