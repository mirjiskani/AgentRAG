
  
## Description

Backend API for AgentRAG - A full-stack AI platform that combines Retrieval-Augmented Generation (RAG), intelligent agents, and semantic search.

Built with NestJS, Prisma, PostgreSQL, and bcrypt for authentication.

## Project setup

```bash
$ npm install
```

## Installed Dependencies

- **@nestjs/common**: Core NestJS packages
- **@nestjs/core**: NestJS core framework
- **@nestjs/jwt**: JWT authentication
- **@nestjs/swagger**: API documentation with Swagger
- **@prisma/client**: Prisma ORM client
- **bcrypt**: Password hashing
- **class-validator**: DTO validation
- **class-transformer**: Data transformation
- **postgresql**: Database (via Prisma)

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/agentrag?schema=public"
PORT=3000
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:5173
```

## Database Setup

```bash
# Install Prisma CLI
$ npm install -g prisma

# Generate Prisma client
$ npx prisma generate

# Run migrations
$ npx prisma migrate dev

# Open Prisma Studio (optional)
$ npx prisma studio
```

## API Documentation

The API documentation is available via Swagger UI. Once the server is running, access the documentation at:

**http://localhost:3000/api/docs**

The Swagger UI provides:
- Interactive API documentation
- Request/response examples
- Ability to test endpoints directly from the browser
- JWT Bearer authentication support

All endpoints are prefixed with `/api`, so the full base URL is `http://localhost:3000/api`

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters
- `name`: Required string

#### POST /api/auth/login
Login a user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation:**
- `email`: Must be a valid email address
- `password`: Minimum 8 characters

## Project Structure

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts    # Auth endpoints
│   │   ├── auth.service.ts       # Auth business logic
│   │   └── dto/
│   │       ├── register.dto.ts   # Registration validation
│   │       └── login.dto.ts      # Login validation
│   ├── prisma/
│   │   ├── prisma.module.ts      # Prisma module
│   │   └── prisma.service.ts     # Prisma service
│   ├── app.module.ts             # Root module
│   └── main.ts                   # Application entry point
├── prisma/
│   └── schema.prisma             # Database schema
└── .env                          # Environment variables
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Author

- Mir Khan
