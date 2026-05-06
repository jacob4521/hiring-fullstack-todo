# TODO App - Frontend (React.js)

This is the frontend client for the Full-Stack TODO application, built using React.js and styled with Tailwind CSS.

## Setup Instructions

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   By default, the React app expects the backend to be running on http://localhost:5000.
   If your backend is running on a different port or domain, you can create a .env file in the root of the client directory:

   ```bash
   VITE_API_URL=http://localhost:5000
   ```

4. **Satrt the development servers:**
   ```bash
   npm run dev
   ```

### Assumptions & Limitations

- **API URL:** The frontend assumes the backend REST API is available locally at port `5000` during development.
- **UI/UX:** Loading states (e.g., "Adding Task...", "Deleting...") and user-friendly error alerts have been implemented to handle API delays and failures gracefully.
- **Styling:** Tailwind CSS is used for rapid and responsive UI styling.
