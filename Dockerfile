#
# Builder stage.
#
FROM node:13.12.0-alpine as build

WORKDIR /usr/src/app

COPY ./package*.json ./yarn.lock ./razzle.config.js ./tsconfig.json ./
COPY ./src ./src
COPY ./webpack ./webpack
COPY ./typings ./typings
COPY ./public ./public
ENV RAZZLE_API_DOMAIN=${RAZZLE_API_DOMAIN}
RUN yarn install --frozen-lockfile --only=production && npm run build
ENV NODE_ENV=production

CMD npm run start:prod
