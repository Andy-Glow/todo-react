// Обёртка для всего списка задач и системного сообщения об их отсутствии

import { memo, useContext } from "react";
import { ToDoItem, TasksContext } from "@/entities/todo";

const ToDoList = ({ styles }) => {
  const { tasks, filteredTasks } = useContext(TasksContext);
  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((tasks) => (
        <ToDoItem className={styles.item} key={tasks.id} {...tasks} />
      ))}
    </ul>
  );
};

export default memo(ToDoList);
