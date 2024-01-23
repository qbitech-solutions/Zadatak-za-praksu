FROM node:21-alpine 

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173 8000

CMD ["npm","start"]