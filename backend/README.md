
  
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
- **pdf-parse**: PDF parsing library for extracting text from PDF files // replaceing 
- **multer**: File upload handling
- **mammoth**: DOCX parsing library for extracting text from DOCX files




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

## Options Available
## Vector Database Strategy

### Evaluated Options

During the design phase of AgentRAG, two vector storage approaches were evaluated:

#### Option 1: PostgreSQL + pgvector

PostgreSQL can be extended with the pgvector extension to store and query vector embeddings directly within the database.

Example installation:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Benefits:

* Single database architecture
* Simplified backup and maintenance
* Suitable for small to medium-sized RAG applications

Challenges:

* Requires pgvector installation on the PostgreSQL server
* Additional setup complexity on local Windows environments
* Less specialized for large-scale vector search workloads

#### Option 2: Qdrant (Selected)

Qdrant is a dedicated vector database optimized for semantic search and Retrieval-Augmented Generation (RAG) workloads.

Benefits:

* Purpose-built for vector search
* Fast similarity retrieval
* Native filtering and metadata support
* Excellent integration with AI frameworks such as LangChain and LangGraph
* Easy local development using Docker

### Selected Architecture

AgentRAG uses:

* PostgreSQL for users, documents, metadata, and document chunks
* Qdrant for vector embeddings and semantic retrieval

Architecture:

User Upload
↓
Document Storage (PostgreSQL)
↓
Text Extraction
↓
Chunking
↓
Embedding Generation
↓
Qdrant Vector Storage
↓
Semantic Search
↓
LLM Response Generation

This architecture was chosen to align with modern AI engineering practices and production-ready RAG systems.



## Qdrant Vector Database Setup

```bash
# Start Qdrant using Docker
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
```
## Install qdrant client

```bash
npm install @qdrant/js-client-rest

```

## Qdrant Dashboard

http://localhost:6333/dashboard

## Ollama Local LLM Setup

Ollama allows you to run large language models locally for privacy and cost efficiency.

### Installation

**Windows:**
```bash
# Download and install from https://ollama.com/download/windows
# Or use winget:
winget install Ollama.Ollama
```

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Pull and Run a Model

```bash
# Pull a model (e.g., Llama 3.2)
ollama pull llama3.2

# Pull embedding model for RAG
ollama pull nomic-embed-text

# Run a model interactively
ollama run llama3.2

# List available models
ollama list

# View running models
ollama ps
```

### Configure Ollama for AgentRAG

Add the following environment variable to your `.env` file:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### Ollama API

Ollama provides a REST API at `http://localhost:11434` that is compatible with the OpenAI API format.

**Example API call:**
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?"
}'
```

### Recommended Models for RAG

- **llama3.2** - Good balance of speed and quality
- **mistral** - Lightweight and fast
- **codellama** - Specialized for code-related tasks
- **nomic-embed-text** - For generating embeddings (if not using external embedding service)

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
