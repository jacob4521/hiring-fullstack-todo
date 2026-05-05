import { deleteTodo, toggleTodoDone } from "../api";

const TodoList = ({ todos, refreshTodos }) => {
  // If the array list is empty show this message
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 my-8">
        No tasks found. Add a new one!
      </p>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      refreshTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      await toggleTodoDone(id);
      refreshTodos();
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`p-4 border rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow ${todo.done ? "bg-gray-100 opacity-75" : "bg-white"}`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone(todo._id)}
              className="w-5 h-5 cursor-pointer accent-blue-600"
            />
            <h3
              className={`font-bold text-lg ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}
            >
              {todo.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
          </div>

          <div className="flex space-x-3 items-center">
            <button className="text-sm text-blue-600 font-semibold hover:text-blue-800 cursor-pointer">
              Edit
            </button>

            <button
              onClick={() => {
                handleDelete(todo._id);
              }}
              className="text-sm text-red-600 font-semibold hover:text-red-800 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
