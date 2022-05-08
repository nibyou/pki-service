FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn install --immutable --immutable-cache

COPY . .

CMD ["npm", "start"]
