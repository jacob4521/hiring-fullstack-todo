import Todo from "../models/Todo.js";

// Get all todos (GET /api/todos)
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};

// Create a new todo (POST /api/todos)
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating todo", error: error.message });
  }
};

// Update a todo (PUT /api/todos/:id)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true },
    );

    if (!updateTodo) {
      res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(updateTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo:", error: error.message });
  }
};

// Toggle done status (PATCH /api/todos/:id/done)
export const toggleDone = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the todo by ID
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    // Toggle the done status
    todo.done = !todo.done;
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling done status:", error: error.message });
  }
};

// Delete a todo (DELETE /api/todos/:id)
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo:", error: error.message });
  }
};
