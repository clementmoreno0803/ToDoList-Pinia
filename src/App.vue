<template>
  <main>
    <Teleport to="body">
      <span class="background" id="blue"></span>
      <span class="background" id="bittersweet"></span>
      <span class="background" id="yellow"></span>
      <span class="background" id="peach"></span>
    </Teleport>
    <!-- heading -->
    <div class="header-container">
      <header class="header">
        <h1 class="header__title">
          Your new <br />
          Daily List
        </h1>
      </header>

      <!-- new task form -->
      <nav class="user-inputs">
        <div class="new-task-form">
          <TaskForm />
        </div>
        <!-- filter -->
        <div class="filter">
          <span id="filter__all" @click="filter = 'all'">All tasks</span>
          <span id="filter__fav" @click="filter = 'favs'">Fav tasks</span>
        </div>
      </nav>
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do.</p>
      <div class="task-list-container">
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} tasks in your favs list.</p>
      <div class="task-list-container">
        <div v-for="task in taskStore.favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from "./components/TaskDetail.vue";
import TaskForm from "./components/TaskForm.vue";

import { useTaskStore } from "./stores/TaskStore";
import { ref, onMounted } from "vue";

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const filter = ref("all");
    onMounted(() => {
      taskStore.getTasks();
    });
    return { taskStore, filter, onMounted };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap");

body {
  background: #030c0f;
  margin: 0;
}

body * {
  font-family: "Archivo Black";
}

/* background */

.background {
  height: 15px;
  width: 20%;
  position: absolute;
  top: 0;
}

#blue {
  background: #3da5d9;
  left: 0;
}
#bittersweet {
  background: #ed6a5a;
  left: 20%;
}
#yellow {
  background: #ffb100;
  left: 40%;
}
#peach {
  background: #f6dda3;
  left: 60%;
}
/* main */

main {
  padding: 0 10%;
}

/* header-container */

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* header */

header {
  padding-top: 20px;
  display: flex;
}

.header__title {
  max-width: 640px;
  font-weight: 600;
  width: 100%;
  color: white;
  font-size: 5em;
}

/* nav */

.user-inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
}

/* filter  */

#filter__all {
  color: #3da5d9;
  margin-right: 20px;
}
#filter__fav {
  color: #f6dda3;
}

/* task-list */
.task-list {
  margin: 100px auto;
  color: white;
}

.task-list-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.new-task-form {
  display: flex;
  justify-content: center;
}
/* ---- Tablet ---- */

@media (max-width: 1064px) {
  .header__title {
    max-width: 640px;
    font-weight: 600;
    width: 100%;
    color: white;
    font-size: 4em;
  }
  .task-list-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

/* ---- Mobile ---- */

@media (max-width: 768px) {
  /* main */

  main {
    padding: 0 10%;
  }

  /* header-container */

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  /* header */

  header {
    padding-top: 20px;
    display: flex;
  }

  .header__title {
    max-width: 640px;
    font-weight: 600;
    width: 100%;
    color: white;
    font-size: 3em;
  }

  /* nav */

  .user-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
  }

  /* filter  */

  .filter {
    display: flex;
    justify-content: space-evenly;
  }

  /* task-list */
  .task-list {
    margin: 100px auto;
    color: white;
  }

  .task-list-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .new-task-form {
    display: flex;
    justify-content: center;
  }
}
</style>
