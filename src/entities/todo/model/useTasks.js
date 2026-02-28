import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import tasksAPI from "@/shared/api/tasks/tasksAPI";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  // Удаление всех задач
  const deleteAllTasks = useCallback(async () => {
    const isConfirmed = confirm("Are you sure you want to delete all?");

    if (!isConfirmed) return;

    try {
      // Удаляем задачи последовательно, чтобы не перегружать сервер
      for (const task of tasks) {
        const response = await fetch(`https://2b694d80923013f1.mokky.dev/Tasks/${task.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete task ${task.id}`);
        }
      }

      // После успешного удаления всех задач очищаем локальное состояние
      setTasks([]);
      console.log("Все задачи успешно удалены");
      alert("Все задачи удалены!");
    } catch (error) {
      console.error("Ошибка при удалении задач:", error);
      alert("Произошла ошибка при удалении задач. Пожалуйста, обновите страницу.");

      // Загружаем актуальное состояние с сервера
      const response = await fetch("https://2b694d80923013f1.mokky.dev/Tasks");
      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    }
  }, [tasks]);

  // Удаление выбранной задачи
  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setDisappearingTaskId(taskId);
        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          setDisappearingTaskId(null);
        }, 400);
      });
    },
    [tasks],
  );

  // Выбор задачи для отметки о её выполнении
  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone };
            }
            return task;
          }),
        );
      });
    },
    [tasks],
  );

  // Добавление задачи
  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  // Загрузка задач при монтировании
  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll().then(setTasks);
  }, []);

  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;
