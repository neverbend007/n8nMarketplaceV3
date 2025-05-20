# Use official Node.js 20 image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (use package-lock.json for better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, copy only necessary files
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and node_modules from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/src ./src
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"] 