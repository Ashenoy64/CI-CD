# Docker Cheat Sheet


## Basic Docker Commands

- Pull and run an Nginx container:
  ```
  docker run -d -p 8080:80 --name webserver nginx
  ```

- List running containers:
  ```
  docker ps
  ```

- List all images:
  ```
  docker images
  ```

- Attach to a container:
  ```
  docker container exec -it webserver bash
  ```

- Stop a container:
  ```
  docker stop webserver
  ```

- Remove a container from memory:
  ```
  docker rm webserver
  ```

## Docker File

Create a `Dockerfile` to build a custom image:

```Dockerfile
# Specify the base image
FROM nginx:alpine

# Copy files to the container
COPY . /usr/share/nginx/html
```

Build and run the custom image:

```
# Build the image
docker build -t webserver-image:v1 .

# Run the image
docker run -d -p 8080:80 --name test webserver-image:v1
```

## Docker File (Node.js Example)

```Dockerfile
# Specify the base image
FROM alpine

# Install Node.js and npm
RUN apk add --update nodejs nodejs-npm

# Copy the application files to the container
COPY . /src

# Set the working directory
WORKDIR /src

# Install application dependencies
RUN npm install

# Expose the application port
EXPOSE 8080

# Set the entry point to start the application
ENTRYPOINT ["node", "./app.js"]
```

## Docker Volumes

Volumes provide a place to store shared and persistent data.

```bash
# Create a new volume
docker volume create myvolume

# List all volumes
docker volume ls

# Display volume information
docker volume inspect myvolume

# Delete a volume
docker volume rm myvolume

# Delete all unused volumes
docker volume prune
```

Run a container with a volume:

```bash
docker run -d --name test -v myvolume:/app nginx:latest
```

## Docker Compose

Docker Compose allows running multiple containers with a single YAML file.

Example `docker-compose.yml`:

```yaml
version: '3.9'

services:
  container1:
    image: imageName1
    ports:
      - '8081:80'
    restart: always

  container2:
    image: imageName2
    ports:
      - '8082:80'
    restart: always

  container3:
    image: imageName3
    ports:
      - '80:80'
    restart: always
```

Docker Compose commands:

```bash
# Build images
docker-compose build

# Start containers
docker-compose start

# Stop containers
docker-compose stop

# Build and start containers
docker-compose up -d

# List containers
docker-compose ps

# Remove containers and networks
docker-compose rm

# Stop and remove containers, networks, and volumes
docker-compose down

# Get logs
docker-compose logs

# Run a command in a container
docker-compose exec [container] bash

# Run under a specific name
docker-compose -p [name] up -d

# List under a specific name
docker-compose ls
```

