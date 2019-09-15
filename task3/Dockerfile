FROM node:12.10.0-alpine

EXPOSE 7070

# environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
    npm install --quiet node-gyp -g

# our work dir
WORKDIR /usr/src/app

# copy only packages and install it
COPY package.json yarn.lock ./

RUN yarn --pure-lockfile --production

# copy rest

COPY . .

RUN yarn build:prod

RUN yarn cache clean

CMD ["yarn", "start:prod"]