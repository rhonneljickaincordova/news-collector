FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx playwright install --with-deps chromium

EXPOSE 3000

CMD ["npm", "start"]
