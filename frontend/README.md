# AgentRAG Frontend

A modern React-based frontend for AgentRAG - an AI-powered document chat application that allows users to ask questions and get AI-powered answers from their documents.

## Features

- � User authentication (login/register)
- 🔄 JWT token management with auto-refresh
- 🛡️ Protected routes for authenticated users
- �💬 Chat with your documents
- 📄 Document management and upload
- 🤖 AI-powered responses
- 🌙 Dark mode support
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AgentRAG/frontend
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

## Development

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── ChatPanel.tsx
│   │   └── DocumentsPanel.tsx
│   └── layouts/
│       ├── header.tsx
│       └── Sidebar.tsx
├── context/
│   └── authContext.tsx
├── hooks/
│   └── userLogin.ts
├── lib/
│   └── tokens-store.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── routes/
│   ├── AppRouter.tsx
│   └── protectedRoutes.tsx
├── services/
│   ├── api.ts
│   └── auth.ts
├── types/
│   └── auth.ts
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

## Configuration

- **Vite Config**: See [vite.config.ts](vite.config.ts)
- **TypeScript Config**: See [tsconfig.json](tsconfig.json)
- **ESLint Config**: See [eslint.config.js](eslint.config.js)

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Data fetching and state management
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Toast notifications
- **clsx** - Conditional className utility

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch (`git checkout -b feature/your-feature`)
2. Make your changes
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Author

**Mir Khan** - Senior Full Stack Engineer

## Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Happy coding!** 🚀
