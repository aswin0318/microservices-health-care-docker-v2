FROM node:18.9.1-alpine

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package.json package-lock.json* ./

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["sh", "-c", ". ./config/development.env && npm run start:dev"]