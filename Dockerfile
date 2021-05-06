FROM node:14.16.1-buster-slim

WORKDIR /usr/src/likely

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]