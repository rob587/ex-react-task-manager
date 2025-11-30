import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<TaskList />} />
              <Route path="add-task" element={<AddTask />} />
              <Route path="task/:id" element={<TaskDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </>
  );
}

export default App;
