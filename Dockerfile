FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g -s --no-progress yarn
RUN yarn install --immutable --immutable-cache

COPY . .

CMD ["npm", "start"]
