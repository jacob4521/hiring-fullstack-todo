import { useState } from "react";
import { createTodo } from "../api.js";

const AddTodo = ({ refreshTodos }) => {
  // 1. මෙතන title සහ description සඳහා useState hooks දෙක හදන්න (initial state එක හිස් string එකක් '' වෙන්න ඕනේ)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    // 2. Form එක submit වෙද්දි page එක අලුතින් reload වෙන එක නවත්වන්න (Hint: e.prevent...)
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
        {/* 4. මේ input එකේ 'value' එක සහ 'onChange' event එක set කරන්න */}
        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        {/* 5. මේ textarea එකේ 'value' එක සහ 'onChange' event එක set කරන්න */}
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
