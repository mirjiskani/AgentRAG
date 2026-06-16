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
* End-to-End Retrieval-Augmented Generation (RAG)

## Developer Experience

* Swagger API Documentation
* Repository Pattern
* Modular NestJS Architecture
* Prisma ORM

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
        │
        ├── Ollama
        │      ├── nomic-embed-text
        │      └── llama3
        │
        └── Qdrant
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
* End-to-End RAG Pipeline
* Repository Pattern Implementation
* Swagger Documentation

## 🚧 In Progress

* Conversation History
* Multi-Turn Conversations
* Source Citations
* Streaming Responses

## 📌 Planned

* Multi-Document Knowledge Bases
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

## Phase 2 — Advanced RAG 🚧

* Conversation History
* Multi-Turn Chat
* Citations & Sources
* Streaming Responses

## Phase 3 — AI Engineering 📌

* OpenAI Integration
* AWS Deployment
* AI Agents
* MCP
* LangGraph
* n8n Workflows
* Production Monitoring

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
