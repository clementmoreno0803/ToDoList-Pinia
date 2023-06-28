<template>
  <form @submit.prevent="createNewObject">
    <input 
      type="text" 
      placeholder="I need to..."
      v-model="newTask"
    >
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

export default {
  setup() {
    const taskStore = useTaskStore()

    const newTask = ref('')


    const createNewObject = () => {
       const newObject = {
        name: newTask.value,
        isFav: false,
        completed: false
       };
        newTask.value = ""
        taskStore.addTask(newObject);
      }
    return { createNewObject, newTask }
    }
  }
</script>