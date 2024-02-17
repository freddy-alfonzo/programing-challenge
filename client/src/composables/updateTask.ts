import api from "../utils/axios";

export const updateTask = (status:boolean, id:number) => {
    api
      .put(`/task/${id}`, {status})
      .then((res) => {
        console.log(res);
        document.dispatchEvent(new Event('tasksUpdated'));
      })
      .catch((error) => {
        console.error(error);
      });
  };




