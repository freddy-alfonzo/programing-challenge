import { ref, onUnmounted } from 'vue';
import api from '../utils/axios';

import type { Task } from '../utils/types';

export const useGetTasks = () => {
  const state = ref<'loading' | 'failed' | 'loaded'>('loading');
  const tasks = ref<Task[]>([]);

  const getTasks = () => {
    api.get<Task[]>('/tasks')
      .then((response) => {
        tasks.value = response.data;
        state.value = 'loaded';
      })
      .catch((error) => {
        console.error(error);
        state.value = 'failed';
      });
  };

  getTasks();
  document.addEventListener('tasksUpdated', getTasks)

  //Removing the event listener when Unmounted to avoid memory leaks
  onUnmounted(() => {
    document.removeEventListener('tasksUpdated', getTasks);
  });

  return { state, tasks };
};

// Another way to handle task updates could be Vuex, and update the global state of the tasks 
// when a task is created, deleted or updated, in this case lets keep it simple