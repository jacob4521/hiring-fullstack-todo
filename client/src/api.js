import axios from "axios";

// Base URL
const API_URL = "http://localhost:5000/api/todos";

// 1. Get all todos
export const fetchTodos = () => axios.get(API_URL);

// 2. Create a new todo
export const createTodo = (newTodo) => axios.post(API_URL, newTodo);

// 3. Update a todo (Title/Description)
export const updateTodo = (id, updatedTodo) =>
  axios.put(`${API_URL}/${id}`, updatedTodo);

// 4. Toggle a todo's done status
export const toggleTodoDone = (id) => axios.patch(`${API_URL}/${id}/done`);

// 5. Delete a todo
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
