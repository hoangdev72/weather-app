FROM node:18-alpine

WORKDIR /opt/weather-app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD [ "npm", "start" ]
