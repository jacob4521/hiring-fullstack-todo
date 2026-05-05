import mongoose from "mongoose";

// Defining the Todo schema
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
