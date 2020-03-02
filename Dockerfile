
FROM mhart/alpine-node:latest AS builder
COPY . .
RUN yarn run build

FROM mhart/alpine-node as prod
RUN yarn global add serve
COPY --from=builder /build .
CMD ["serve", "-p", "80", "-s", "."]
