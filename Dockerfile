FROM node:16

RUN npm install pm2@latest --global --quiet

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["pm2-runtime", "./config/pm2.json"]