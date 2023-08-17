<template>
  <div class="task-card" :class="{ active: task.completed === true }">
    <input type="checkbox"  @click="taskStore.toggleCompleted(task.id)">
    <h3>{{ task.name }}</h3>
    <div class="task-card__icons">
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

<style>
/* task list */

.task-card {
    padding: 6px 20px;
    box-shadow: 2px 4px 6px rgba(255, 255, 255, 0.865);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    border-radius: 10px;
    width: auto;
    border: 1px solid white;
  
}

.task-card h3,
.task-card__icons {
    display: inline-block;
    word-wrap: break-word;
    color : #e8e8e8;
}

.task-card input{
  margin: 10px;
} 

.task-card__icons {
    text-align: right;
}

.task-card i {
    font-size: 1.225em;
    margin-left: 6px;
    cursor: pointer;
    color: #e8e8e8;
}

.task-card i.active {
    color: #ff005d;
}

.task-card.active {
    background: rgba(255, 255, 255, 0.25);
    transition: all 1.4 ease-out;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.734);
    border: none;

}

.task-card.active h3 {
    color: rgb(0, 0, 0);
    text-decoration: line-through;
}

</style>