import api from "../utils/axios";

export const createTask = (task: string) => {
    api
      .post("/task", task)
      .then((res) => {
        console.log(res);
        document.dispatchEvent(new Event('tasksUpdated'));
      })
      .catch((error) => {
        console.error(error);
      })
  };


