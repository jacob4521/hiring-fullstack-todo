import { useState } from "react";
import { deleteTodo, toggleTodoDone, updateTodo } from "../api";

const TodoList = ({ todos, refreshTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [loadingState, setLoadingState] = useState({ id: null, action: null });

  // If the array list is empty show this message
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 my-8">
        No tasks found. Add a new one!
      </p>
    );
  }

  // function to delete a todo
  const handleDelete = async (id) => {
    try {
      setLoadingState({ id: id, action: "delete" });
      await deleteTodo(id);
      refreshTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    } finally {
      setLoadingState({ id: null, action: null });
    }
  };

  // Function to toggle the done status of a todo
  const handleToggleDone = async (id) => {
    try {
      setLoadingState({ id: id, action: "toggle" });
      await toggleTodoDone(id);
      refreshTodos();
    } catch (error) {
      console.error("Error toggling task status:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setLoadingState({ id: null, action: null });
    }
  };

  // Function to handle the edit button click
  const handleEditClick = async (id) => {
    try {
      setEditingId(id);
      setEditTitle(todos.find((todo) => todo._id === id).title);
      setEditDescription(todos.find((todo) => todo._id === id).description);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Function to handle the save button click after editing
  const handleSaveEdit = async (id) => {
    try {
      setLoadingState({ id: id, action: "update" });
      const updatedTodo = {
        title: editTitle,
        description: editDescription,
      };

      await updateTodo(id, updatedTodo);
      await refreshTodos();

      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setLoadingState({ id: null, action: null });
    }
  };

  return (
    <div className="space-y-4">
      {/* Loop through the todos and render each one */}
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`p-4 border rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow ${
            todo.done ? "bg-gray-100 opacity-75" : "bg-white"
          }`}
        >
          {/* Rendering the todo based on its edit state */}
          {todo._id === editingId ? (
            //  Edit mode UI
            <div className="flex flex-col space-y-3 w-full">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="2"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-1.5 text-sm bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>

                {/* Save button based on the loading state */}
                <button
                  onClick={() => handleSaveEdit(todo._id)}
                  disabled={loadingState.id === todo._id}
                  className={`px-4 py-1.5 text-sm font-semibold rounded transition-colors ${
                    loadingState.id === todo._id &&
                    loadingState.action === "update"
                      ? "bg-blue-400 text-white cursor-not-allowed" // Loading වෙද්දී පේන පාට
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loadingState.id === todo._id &&
                  loadingState.action === "update"
                    ? "Saving..."
                    : "Save"}
                </button>
              </div>
            </div>
          ) : (
            // Normal mode UI
            <div className="flex justify-between items-center w-full">
              {/* Left side: Checkbox and text */}
              <div className="flex items-center space-x-4 overflow-hidden flex-1 min-w-0">
                {/* checkbox based on the loading state */}
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggleDone(todo._id)}
                  disabled={
                    loadingState.id === todo._id &&
                    loadingState.action === "toggle"
                  }
                  className="w-5 h-5 cursor-pointer accent-blue-600 shrink-0"
                />

                {/* Todo text */}
                <div className="flex flex-col min-w-0 flex-1">
                  <h3
                    className={`font-bold text-lg ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}
                  >
                    {todo.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 wrap-break-word whitespace-pre-wrap">
                    {todo.description}
                  </p>
                </div>
              </div>

              {/* Right side: Buttons */}
              <div className="flex space-x-3 items-center ml-4 shrink-0">
                <button
                  onClick={() => handleEditClick(todo._id)}
                  className="text-sm text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors"
                >
                  Edit
                </button>

                {/* Delete button based on the loading state */}
                <button
                  onClick={() => handleDelete(todo._id)}
                  disabled={
                    loadingState.id === todo._id &&
                    loadingState.action === "delete"
                  }
                  className={`text-sm font-semibold transition-colors ${
                    loadingState.id === todo._id &&
                    loadingState.action === "delete"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-800 cursor-pointer"
                  }`}
                >
                  {loadingState.id === todo._id &&
                  loadingState.action === "delete"
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
