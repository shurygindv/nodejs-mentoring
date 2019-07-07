FROM node:12.6.0-alpine

# install yarn
RUN npm install -g yarn

# our work dir
WORKDIR /usr/src/app

# environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# copy only package and install it
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production

# copy rest
COPY . .

RUN yarn build:prod

EXPOSE 7070

USER node

CMD ["node", "dist/main.js"]