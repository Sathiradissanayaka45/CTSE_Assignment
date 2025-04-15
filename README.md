# E-commerce Microservices Platform

This repository contains a microservice-based e-commerce platform with User Authentication and Product Catalog services.

## Architecture

[Brief description of the architecture with link to detailed documentation in docs folder]

## Services

### Authentication Service
- User registration
- Authentication
- Token validation
- User profile management

### Product Catalog Service
- Product listings
- Product search
- Category management
- Product details

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: React
- **Database**: MongoDB
- **Authentication**: JWT
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Cloud Provider**: AWS

## Development Setup

### Prerequisites
- Node.js (v14+)
- Docker and Docker Compose
- MongoDB

### Local Development
1. Clone the repository
2. Run `docker-compose up` to start all services
3. Access the application at http://localhost:3000

## Deployment

The services are deployed using AWS ECS. See the deployment documentation in the docs folder for details.

## Security Features

This project implements several security best practices:
- JWT-based authentication
- Secure password storage with bcrypt
- Rate limiting for login attempts
- Role-based access control

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline includes:
- Automated testing
- Code quality checks with SonarCloud
- Docker image building and publishing
- Automated deployment to AWS ECS
