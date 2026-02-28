const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Сохраняем данные в хранилище
  };

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks,
  };
};

export default useTasksLocalStorage;
