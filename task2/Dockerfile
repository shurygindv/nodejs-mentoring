FROM node:12.6.0-alpine

EXPOSE 7070

# environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
    npm install --quiet node-gyp -g


# install yarn
RUN npm install -g yarn

# our work dir
WORKDIR /usr/src/app

# copy only packages and install it
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-cache --production

# copy restyy

COPY . .

RUN yarn build:prod

# least privilege
USER node

CMD ["yarn", "start:prod"]
