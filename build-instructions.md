# Rebuild the Docker images
docker-compose build

# Start the containers in detached mode
docker-compose up -d

# Attach to the app container
docker attach <cotainer id>
