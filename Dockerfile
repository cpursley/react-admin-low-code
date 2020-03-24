FROM node:lts-slim AS node_modules
COPY package.json .
RUN npm install --silent

FROM node:lts-slim AS builder
COPY package.json .
COPY --from=node_modules /node_modules /node_modules
COPY /src /src
COPY /public /public
RUN npm run-script build --quiet

FROM node:lts-slim as prod
RUN yarn global add serve
COPY --from=builder /build .
CMD ["serve", "-p", "80", "-s", "."]
