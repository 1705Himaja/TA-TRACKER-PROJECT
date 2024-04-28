FROM node:18.17.1
WORKDIR /usr/src/app
# COPY package*.json ./
COPY . .
RUN npm install

WORKDIR /usr/src/app/Frontend
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
EXPOSE 3000

CMD ["node", "app.js"]
