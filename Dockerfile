FROM mcp-optimized:latest

WORKDIR /app/paperclip-mcp

COPY package.json tsconfig.json ./
RUN npm install

COPY src/ ./src/
RUN npm run build

CMD ["node", "dist/index.js"]
