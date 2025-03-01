# Use the official Node.js image from the Docker Hub
FROM node:22.13.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000 5173

# Command to run the Node.js server
CMD ["sh"]