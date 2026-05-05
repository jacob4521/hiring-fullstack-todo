import { fetchTodos } from "./api.js";
import AddTodo from "./components/AddTodo.jsx";

const App = () => {
  return (
    <div>
      <AddTodo refreshTodos={fetchTodos} />
    </div>
  );
};

export default App;
