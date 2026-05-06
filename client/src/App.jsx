import { useEffect, useState } from "react";
import { fetchTodos } from "./api.js";
import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // function to update the all todos to the state
  const getTodos = async () => {
    try {
      // Clear any previous error messages
      setErrorMessage("");

      // update the state with the data we got from the backend
      const { data } = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrorMessage("Failed to load tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get all the todos when the component mounts
  useEffect(() => {
    const loadInitialTodos = async () => {
      await getTodos();
    };

    loadInitialTodos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My TODO App
      </h1>

      <AddTodo refreshTodos={getTodos} />

      {/* Show error message if there's an error */}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-blue-600 font-semibold my-8 animate-pulse">
          Loading tasks...
        </div>
      ) : (
        <TodoList todos={todos} refreshTodos={getTodos} />
      )}
    </div>
  );
};

export default App;
