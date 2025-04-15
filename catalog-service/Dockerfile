# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src

# Create and use non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nodeuser && \
    chown -R nodeuser:nodejs /app

USER nodeuser

# Expose port 
EXPOSE 3001

# Start the application
CMD ["node", "src/server.js"]
