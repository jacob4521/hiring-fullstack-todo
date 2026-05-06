# TODO App - Backend (Express.js)

This is the backend API for the Full-Stack TODO application, built using Node.js, Express.js, and MongoDB.

## Setup Instructions

1. **Navigate to the server directory:**

   ```bash
   cd server

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `server` directory and add the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```


## Database Connection Notes

- This application uses **MongoDB** to persist data.
- You can use either a local MongoDB instance or a cloud-based **MongoDB Atlas** cluster.
- Ensure your `MONGODB_URI` is correctly set in the `.env` file before starting the server.

## API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint              | Description                       |
| :----- | :-------------------- | :-------------------------------- |
| GET    | `/api/todos`          | Get all TODO items                |
| POST   | `/api/todos`          | Create a new TODO item            |
| PUT    | `/api/todos/:id`      | Update a TODO (title/description) |
| PATCH  | `/api/todos/:id/done` | Toggle the done status            |
| DELETE | `/api/todos/:id`      | Delete a TODO                     |

## Assumptions & Limitations

- **No Authentication:** Currently, there is no user authentication system. All TODOs are shared globally.
- **Payload Format:** The server expects and returns `application/json`.
