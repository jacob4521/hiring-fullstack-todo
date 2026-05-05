const TodoList = ({ todos, refreshTodos }) => {
  // If the array list is empty show this message
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 my-8">
        No tasks found. Add a new one!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      // Render the list of todos
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
        >
          <div>
            <h3 className="font-bold text-lg text-gray-800">{todo.title}</h3>

            <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
          </div>

          <div className="flex space-x-3 items-center">
            // Place to add the buttons
            <span className="text-sm text-blue-500">Buttons here</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
