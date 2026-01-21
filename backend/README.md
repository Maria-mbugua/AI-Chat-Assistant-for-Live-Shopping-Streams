# AI Chat Assistant Backend

This is the backend for the AI Chat Assistant, designed to support real-time chat response for live shopping streams. It uses Express for the HTTP server and `ws` for WebSocket communication.

## Features

- **HTTP Server**: Provides a basic endpoint at `/` to confirm the server is running.
- **WebSocket Server**: Handles real-time bidirectional communication with clients for chat messages.
- **CORS Enabled**: Allows requests from different origins, essential for web-based frontends.
- **JSON Body Parsing**: Configured to parse JSON request bodies.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **ws**: A simple to use, blazing fast, and thoroughly tested WebSocket client and server for Node.js.
- **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **ts-node-dev**: Restarts node application when a file change is detected, useful for development.

## Project Structure

```
.
└── backend/
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── node_modules/
    └── src/
        └── index.ts
```

## Setup and Installation

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading (using `ts-node-dev`):

```bash
npm run dev
```

The server will listen on `http://0.0.0.0:3001`.

### Production Mode

To build the TypeScript code and then run the compiled JavaScript:

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This will compile the TypeScript files from `src/` into JavaScript in the `dist/` directory.

2.  **Start the server**:
    ```bash
    npm start
    ```
    The server will listen on `http://0.0.0.0:3001`.

## API Endpoints

### HTTP

-   **GET /**
    Returns a simple message indicating the backend is running.
    ```
    AI Chat Assistant Backend is running!
    ```

### WebSocket

The WebSocket server is available at `ws://0.0.0.0:3001`.

-   **Connection**: Clients can establish a WebSocket connection.
-   **Message Handling**: Upon receiving a message, the server echoes it back to the client with a prefix "Server received: ".
