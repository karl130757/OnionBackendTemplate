# Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

---

# .dockerignore

node_modules
npm-debug.log
.env

---

# .gitignore

# Node.js specific
node_modules
npm-debug.log

# Environment variables
.env

# Logs
logs
*.log

# Dependency directories
/.pnp
.pnp.js

# IDE-specific
.vscode/
.DS_Store
