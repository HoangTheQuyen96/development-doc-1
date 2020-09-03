FROM node:12.13.1-alpine

WORKDIR /opt
ENV NODE_ENV=development 
    
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "./src/app.js"]

