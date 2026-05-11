# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install required system packages
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

RUN mkdir -p uploads logs

EXPOSE 5000

CMD ["node", "src/server.js"]
