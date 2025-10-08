# Shop

This is a Next.js application.

## 🚀 Getting Started

### 1. Install Dependencies

```sh
npm install
# or
pnpm install
# or
yarn install
```

### 2. Run in Development Mode

```sh
npm run dev
# or
pnpm dev
# or
yarn dev
```

By default, the application will be available at: `http://localhost:3000`.

### 3. Build for Production

```sh
npm run build
```

### 4. Start Production Server

```sh
npm run start
```

### 5. Run with Environment Variables
Create a `.env` file in the project root and add variables:

```
HOST=localhost
PORT=3000
```

Then run:
```sh
npm run dev
```

# Docker

This project can be run inside a Docker container.

## 🚀 Running in Docker

### 1. Clone the repository (if needed)
```bash
git clone https://github.com/luzhnyak/prom-concept-next
cd prom-concept-next
```

### 2. Run the container
```bash
 docker compose up --build
```

## 🛑 Stopping the container
To stop the running container, find its CONTAINER_ID:
```bash
docker ps
```

Then stop it:
```bash
docker stop CONTAINER_ID
```

## 🛠 Technologies

- **Next.js** - Framework for React
- **React** - Library for building UI
- **TypeScript** - Static typing
- **Material UI** - UI library
- **ESLint, Prettier** - Code formatting tools
