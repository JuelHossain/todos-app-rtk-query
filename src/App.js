import { Provider } from "react-redux";
import { store } from "./app/store";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col pt-16 gap-5 justify-center mx-auto  bg-blue-100 min-h-screen px-6 font-sans">
        <Navbar />
        <TaskTodo />
      </div>
    </Provider>
  );
}

export default App;

function TaskTodo() {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mx-auto">
      <Header />
      
      <hr className="mt-4" />
      <TodoList />
      <hr className="mt-4" />
      <Footer />
      <hr className="mt-4" />
    </div>
  );
}
