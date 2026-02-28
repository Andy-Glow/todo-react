const URL = "https://2b694d80923013f1.mokky.dev/Tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },

  getById: (id) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, { method: "DELETE" });
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
