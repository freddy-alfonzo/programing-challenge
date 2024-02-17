<template>
  <div class="input-container">
    <input
      type="text"
      v-model="taskContent"
      class="input-container__input"
      placeholder="Add a new task..."
      @keypress.enter="handleSubmit()"
      autofocus
    />
    <button class="input-container__addBtn" @click="handleSubmit()">ADD</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createTask } from "../composables/createTask";

const taskContent = ref("");

const handleSubmit = async () => {
  //in This case i would love to use an personalized alert or an Sweet alert
  if (taskContent.value === "") return alert("The task can not have an empty value");
  createTask(taskContent.value);
  taskContent.value = "";
};
</script>

<style scoped lang="scss">
.input-container__input {
  color: var(--color-heading);
  font-size: var(--fs-3);
  font-weight: 500;
  box-shadow: var(--box-shadow-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-1);
  width: 100%;
  height: 42.4px;
  outline: none;
  cursor: pointer;
  border: 1px solid #a6a6b5;
  background-color: rgb(238, 242, 248);
  font-family: "Open Sans";
}

.input-container__addBtn {
  position: absolute;
  right: 3%;
  top: 22%;
  border: 1px solid #a6a6b5;;
  background: #fff;
  cursor: pointer;
  border-radius: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-weight: 600;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  letter-spacing: 0.12rem;
  transition: all ease 400ms;
  &:hover {
    background: #ccc;
  }
}

.input-container {
  position: relative;
}
</style>
