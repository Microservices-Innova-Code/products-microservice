# ========== DEPENDENCIES ==========
FROM node:20.19-alpine3.20 AS deps

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install


# ========== BUILDER ==========
FROM node:20.19-alpine3.20 AS build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package*.json ./

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm ci -f --only=production && npm cache clean --force

# ========== PROD IMAGE ==========
FROM node:20.19-alpine3.20 AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/prisma.config.ts ./prisma.config.ts
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/src/generated ./src/generated
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

USER node

CMD ["npm", "run", "start:prod"]