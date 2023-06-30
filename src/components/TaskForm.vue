<template>
  <form @submit.prevent="createNewObject">
    <input
      class="task-form"
      type="text"
      placeholder="I need to..."
      v-model="newTask"
    />
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";

export default {
  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");

    const createNewObject = () => {
      const newObject = {
        name: newTask.value,
        isFav: false,
        completed: false,
      };
      newTask.value = "";
      taskStore.addTask(newObject);
    };
    return { createNewObject, newTask };
  },
};
</script>

<style>
/* new task form */

form{
  display: flex;
  align-items: center;
}
.task-form,
input[type="text"] {
  position: relative;
  background: #ffffff;
  padding: 4px;
  width: 350px;
  border-radius: 5px;
  border: none;
   height: 30px;
}

/* ---- Mobile ---- */

@media (max-width: 768px) {

.task-form, input[type="text"] {
    position: relative;
    background: #ffffff;
    padding: 4px;
    width: 280px;
    border-radius: 5px;
    border: none;
    height: 30px;
}

}


</style>
