FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm  --only=prod
COPY . .

CMD ["npm", "start"]