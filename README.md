# Task Manager Application

![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A cross-platform desktop task management application with Electron, React, and NestJS.


## Features

- 📝 Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- 🔍 Search tasks by title or description
- 🗂 Filter tasks by completion status
- 🖥 Cross-platform support (Windows, macOS, Linux)
- 💾 Persistent storage with PostgreSQL

## Technology Stack

### Frontend
- React.js
- Electron.js
- Axios (HTTP client)
- React Icons

### Backend
- NestJS
- TypeORM
- PostgreSQL

### Development Tools
- Vite (React build tool)
- TypeScript
- SQLite (development alternative)

## Installation

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm v9+

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/vk-workshop/task-manager.git
cd task-manager
npm install
cd client && npm install && cd ..
npm run build:client
npm start