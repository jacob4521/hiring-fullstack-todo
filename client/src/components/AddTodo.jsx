import { useState } from "react";
import { createTodo } from "../api.js";

const AddTodo = ({ refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      title: title.trim(),
      description: description.trim(),
    };

    try {
      await createTodo(newTodo);

      setTitle("");
      setDescription("");

      refreshTodos();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 bg-gray-50 border rounded-lg shadow-sm"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Description (Optional)"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold px-4 py-2 w-full rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTodo;
