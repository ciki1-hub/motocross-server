.PHONY: install start dev docker-build docker-run

# Install dependencies
install:
	npm install

# Start the API server
start:
	npm start

# Start the API server in development mode
dev:
	npm run dev

# Build the RTMP server Docker image
docker-build:
	cd streaming && docker build -t motocross-rtmp .

# Run the RTMP server Docker container
docker-run:
	docker run -p 1935:1935 -p 8080:8080 motocross-rtmp

# Run both services locally
run-local: install
	@echo "Starting API server..."
	npm start &
	@echo "Starting RTMP server (requires Docker)..."
	cd streaming && docker build -t motocross-rtmp . && docker run -p 1935:1935 -p 8081:8080 motocross-rtmp