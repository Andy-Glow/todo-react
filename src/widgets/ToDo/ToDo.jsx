// Каркас

import { useContext } from "react";
import AddTaskForm from "@/features/add-task";
import SearchTaskForm from "@/features/search-task";
import ToDoInfo from "@/features/stats";
import { ToDoList } from "@/entities/todo";
import Button from "@/shared/ui/Button/Button";
import { TasksContext } from "@/entities/todo";
import styles from "./ToDo.module.scss";

const ToDo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behaviour: "smooth" })}>
        Show first incomplete task
      </Button>
      <ToDoInfo styles={styles} />
      <ToDoList styles={styles} />
    </div>
  );
};

export default ToDo;
