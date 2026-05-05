import { useEffect, useState } from "react";
import { fetchTodos } from "./api.js";
import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);

  // function to update the all todos to the state
  const getTodos = async () => {
    try {
      // update the state with the data we got from the backend
      const { data } = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
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

      <TodoList todos={todos} refreshTodos={getTodos} />
    </div>
  );
};

export default App;
