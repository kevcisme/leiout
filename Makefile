.PHONY: help install dev build clean docker-build docker-run docker-stop deploy logs

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  dev          - Start development server"
	@echo "  build        - Build for production"
	@echo "  clean        - Clean build artifacts"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run   - Run with Docker Compose"
	@echo "  docker-stop  - Stop Docker containers"
	@echo "  deploy       - Build and deploy with Docker"
	@echo "  logs         - View Docker logs"
	@echo "  restart      - Restart Docker containers"

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Clean build artifacts
clean:
	rm -rf dist node_modules/.cache

# Build Docker image
docker-build:
	docker-compose build --no-cache

# Run with Docker Compose
docker-run:
	docker-compose up -d
	@echo "Floor Planner is running at http://localhost:3000"

# Stop Docker containers
docker-stop:
	docker-compose down

# Build and deploy
deploy: docker-build docker-run
	@echo "Deployment complete! Access your app at http://localhost:3000"

# View logs
logs:
	docker-compose logs -f floor-planner

# Restart containers
restart:
	docker-compose restart

# Development with Docker (optional)
docker-dev:
	docker-compose -f docker-compose.dev.yml up

# Clean Docker resources
docker-clean:
	docker-compose down -v --remove-orphans
	docker system prune -f
