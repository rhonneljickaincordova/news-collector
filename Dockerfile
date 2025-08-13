FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port for Render
EXPOSE 3000

# Run the Express server
CMD ["node", "server.js"]
