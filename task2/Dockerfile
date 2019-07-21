### production
FROM node:12.6.0-alpine as production

ENV NODE_ENV=production

EXPOSE 7070

# client app dir
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install prod dependencies
RUN yarn install --frozen-lockfile --no-cache --production 

COPY . .

RUN yarn build:prod

ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD ["yarn", "start:prod"]

### audit stage
FROM production as audit

WORKDIR /usr/audit/app
# be main
USER root
# container audit
RUN apk add --no-cache ca-certificates && update-ca-certificates && \
    wget -O /microscanner https://get.aquasec.com/microscanner && \
    chmod +x /microscanner && \
    /microscanner Y2ZkNDE2NjU2ZGQ1 && \
    rm -rf /microscanner

CMD ["yarn", "audit", "--level", "critical"]

### dev stage
FROM production as development

ENV NODE_ENV=development

RUN yarn

# a.k.a nodemon
CMD ["yarn", "start:dev"]