FROM node:24-alpine
RUN npm install -g pnpm@11.24.0
WORKDIR /repo

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node apps/server ./apps/server

RUN chown -R node:node /repo
USER node
ENV NODE_ENV=production

WORKDIR /repo/apps/server
RUN pnpm install --frozen-lockfile --prod --filter @flick/server...

CMD ["node", "src/server.js"]