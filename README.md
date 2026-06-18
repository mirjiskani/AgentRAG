# AgentRAG

AgentRAG is a full-stack AI platform that combines Retrieval-Augmented Generation (RAG), semantic search, and intelligent document chat to deliver accurate, context-aware answers from user-uploaded documents and knowledge bases.

Built with React, NestJS, PostgreSQL, Qdrant, Ollama, and modern AI technologies, AgentRAG enables users to upload documents, extract and process content, generate vector embeddings, perform semantic retrieval, and interact with documents through AI-powered conversations.

The platform is designed with a provider-agnostic architecture, supporting local AI models through Ollama today while allowing future integration with OpenAI, Anthropic, AWS Bedrock, and other LLM providers.

---

# Features

## Authentication & Security

* JWT Authentication
* Refresh Token Authentication
* Protected Routes
* User-Based Access Control

## Document Management

* Upload Documents
* Delete Documents
* Document Ownership Validation
* User-Specific Document Isolation

## Document Processing

* PDF Text Extraction
* DOCX Text Extraction
* TXT File Processing
* Intelligent Text Chunking

## AI & Retrieval

* Embedding Generation using Ollama (`nomic-embed-text`)
* Vector Storage using Qdrant
* Semantic Similarity Search
* User & Document Scoped Retrieval
* Context Construction from Retrieved Chunks
* AI-Powered Question Answering using Llama 3
* Persistent Chat Sessions
* Conversation History Management
* Multi-Turn Conversations
* End-to-End Retrieval-Augmented Generation (RAG)

## Developer Experience

* Swagger API Documentation
* Repository Pattern
* Modular NestJS Architecture
* Prisma ORM
* Jest Testing
* Supertest E2E Testing

---

# Testing

## Current Test Coverage

### End-to-End (E2E)

* Authentication API

### Planned E2E Coverage

* Document Upload API
* Document Retrieval API
* Chat API
* Complete RAG Workflow

---

# RAG Workflow

## Document Indexing Pipeline

```text
Document Upload
        ↓
Content Extraction
        ↓
Text Chunking
        ↓
Embedding Generation
        ↓
Qdrant Vector Storage
```

## Question Answering Pipeline

```text
User Question
        ↓
Question Embedding
        ↓
Qdrant Semantic Search
        ↓
Retrieve Relevant Chunks
        ↓
Build Context
        ↓
Llama 3 Generation
        ↓
Context-Aware Answer
        ↓
Persist Conversation History
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router

## Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL

## AI & Search

* Ollama
* Llama 3
* nomic-embed-text
* Qdrant Vector Database

## Testing

* Jest
* Supertest

## Infrastructure

* Docker
* Docker Compose (Planned)

---

# Architecture

```text
Frontend (React)
        │
        ▼
Backend API (NestJS)
        │
        ├── PostgreSQL
        │      ├── Users
        │      ├── Documents
        │      ├── Document Chunks
        │      ├── Chat Sessions
        │      └── Chat Messages
        │
        ├── Ollama
        │      ├── nomic-embed-text
        │      └── llama3
        │
        └── Qdrant
               └── Vector Embeddings
```

---

# Current Project Status

## ✅ Completed

* Authentication & Authorization
* Refresh Token Workflow
* Protected Routes
* Document Upload
* Document Deletion
* PDF Processing
* DOCX Processing
* TXT Processing
* Text Chunking
* Embedding Generation
* Ollama Integration
* Qdrant Integration
* Vector Storage
* Semantic Retrieval
* AI Chat Generation
* Chat Session Management
* Conversation History
* Multi-Turn Conversations
* End-to-End RAG Pipeline
* Repository Pattern Implementation
* Swagger Documentation
* Jest Integration
* Authentication E2E Testing

## 🚧 In Progress

* Source Citations
* Streaming Responses
* Multi-Document Chat
* Document Upload E2E Tests
* Chat API E2E Tests

## 📌 Planned

* OpenAI Integration
* AWS Deployment
* AI Agents
* MCP (Model Context Protocol)
* LangGraph Workflows
* n8n Automation
* Evaluation & Monitoring
* Multi-Model Support

---

# Example Use Cases

* Chat with PDFs
* Resume Analysis
* Internal Documentation Search
* Knowledge Base Assistant
* AI-Powered Question Answering
* Semantic Document Search
* Personal AI Assistant

---

# Local Development

## Prerequisites

* Node.js
* PostgreSQL
* Docker
* Ollama

---

## Run Qdrant

```bash
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
```

Verify:

```bash
http://localhost:6333
```

---

## Pull Ollama Models

```bash
ollama pull nomic-embed-text

ollama pull llama3
```

Verify:

```bash
ollama list
```

---

## Backend

```bash
npm install

npm run start:dev
```

---

## Frontend

```bash
npm install

npm run dev
```

---

## Run Tests

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

---

# Roadmap

## Phase 1 — Core RAG ✅

* Authentication
* Document Upload
* Text Extraction
* Chunking
* Embeddings
* Qdrant Integration
* Semantic Search
* AI-Powered Answers
* Chat Sessions
* Conversation History
* Multi-Turn Conversations

## Phase 2 — Quality & Advanced RAG 🚧

* Authentication E2E Tests
* Document Upload E2E Tests
* Chat API E2E Tests
* Complete RAG Workflow E2E Tests
* Source Citations
* Streaming Responses
* Multi-Document Chat

## Phase 3 — AI Engineering 📌

* OpenAI Integration
* AWS Deployment
* AI Agents
* MCP (Model Context Protocol)
* LangGraph
* n8n Workflows
* Production Monitoring
* Evaluation Frameworks

---

# Future AI Engineering Roadmap

After completing AgentRAG:

1. AWS Cloud & AI Infrastructure
2. n8n Workflow Automation
3. AI Agents
4. MCP (Model Context Protocol)
5. LangGraph
6. Production AI Systems

---

# Author

**Mir Khan**

Senior Full-Stack Software Engineer

Building AI-powered applications using:

* RAG (Retrieval-Augmented Generation)
* LLMs
* Ollama
* Qdrant
* MCP
* LangGraph
* Modern Cloud Technologies

Available for Full-Time Opportunities in Germany 🇩🇪
