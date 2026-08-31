FROM node:24-alpine AS build
RUN npm install -g pnpm@11.24.0
WORKDIR /repo

# Copy workspace metadata first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/

# Install just the client's dependencies (and any workspace neighbors it uses)
RUN pnpm install --frozen-lockfile --filter @flick/client...

# Now copy the source and build
COPY apps/client ./apps/client
WORKDIR /repo/apps/client

ARG VITE_API_URL
ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

RUN pnpm build

# Production stage: serve built assets via nginx
FROM nginx:alpine
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/client/dist /usr/share/nginx/html
EXPOSE 80