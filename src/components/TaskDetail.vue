<template>
  <div class="task" :class="{ active: task.completed === true }">
    <input type="checkbox"  @click="taskStore.toggleCompleted(task.id)">
    <h3>{{ task.name }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">
        delete
      </i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
      >
        favorite
      </i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";

export default {
  props: ["task"],
  setup() {
    const taskStore = useTaskStore();
    return { taskStore};
  },
};
</script>