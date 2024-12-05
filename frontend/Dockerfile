
FROM node:18-slim

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

CMD ["npm", "run", "dev"]

EXPOSE 5173
