import { Provider } from "react-redux";
import CompletedTodos from "./components/CompletedTodos";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col pt-16 gap-5 justify-center mx-auto  bg-blue-100 min-h-screen px-6 font-sans">
        <Navbar />
        <TaskTodo />
        <TaskCompleted />
      </div>
    </Provider>
  );
}

export default App;

function TaskTodo({}) {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mx-auto">
      <Header />
      <p className="mt-3">Task To Do</p>
      <hr className="mt-4" />
      <TodoList />
      <hr className="mt-4" />
      <Footer />
      <hr className="mt-4" />
    </div>
  );
}
function TaskCompleted({}) {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mx-auto">
      <p className="mt-3">Completed Task</p>
      <CompletedTodos />
      <hr className="mt-4" />
      <Footer completed />
      <hr className="mt-4" />
    </div>
  );
}
