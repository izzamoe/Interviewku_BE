# di build distroless
# stage pertama ambil dari debian
FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production

# ? stage kedua ambil hasil dari stage pertama dan build distroless
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules

COPY . .
COPY jsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["./bun", "index.js"]

EXPOSE 4000