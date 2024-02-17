<template>
  <div class="task-card">
    <div class="task-card__container">
      <input
        type="checkbox"
        class="task-card__checkbox"
        @click="updateTask(task.is_complete, task.tasks_id, task)"
        v-model="task.is_complete"
      />
      <p>{{ task.content }}</p>
    </div>
    <span
      @click="deleteTask(task.tasks_id)"
      class="material-symbols-outlined task-card__deleteBtn"
    >
      delete
    </span>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import type { Task } from "../utils/types";
import { deleteTask } from "../composables/deleteTask";
import { updateTask } from "../composables/updateTask";

defineProps<{
  task: Task;
}>();
</script>

<style scoped lang="scss">
.task-card {
  display: flex;
  justify-content: space-between;
  color: var(--color-heading);
  font-size: var(--fs-3);
  font-weight: 500;
  box-shadow: var(--box-shadow-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
}

.task-card__container {
  display: flex;
}

.task-card__checkbox {
  width: var(--fs-2);
  margin-right: 0.4rem;
  outline: none;
  border: none;
  cursor: pointer;
}

.task-card__deleteBtn {
  font-size: var(--fs-4);
  color: #ee0000;
  cursor: pointer;
  &:hover {
    color: #aa0000;
  }
}
</style>
