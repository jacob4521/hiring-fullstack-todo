import { useState } from "react";
import { createTodo } from "../api.js";

const AddTodo = ({ refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Task title is required.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const newTodo = {
      title: title.trim(),
      description: description.trim(),
    };

    try {
      await createTodo(newTodo);

      setTitle("");
      setDescription("");

      await refreshTodos();
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessage("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 bg-gray-50 border rounded-lg shadow-sm"
    >
      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded border border-red-200">
          {errorMessage}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setErrorMessage("")
          }}
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Description (Optional)"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`font-bold px-4 py-2 w-full rounded transition-colors ${
          isSubmitting
            ? "bg-blue-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Adding Task..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddTodo;
