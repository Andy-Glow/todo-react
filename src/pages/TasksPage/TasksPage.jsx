import { TasksProvider } from "@/entities/todo";
import Todo from "@/widgets/ToDo";

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;
