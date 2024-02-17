import api from "../utils/axios";

export const deleteTask = (id:number) => {
    api
      .delete(`/task/${id}`)
      .then((res) => {
        console.log(res);
        document.dispatchEvent(new Event('tasksUpdated'));
      })
      .catch((error) => {
        console.error(error);

      })
  };

