import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
    }),
    getters: {
        favs() {
            return this.tasks.filter((t) => t.isFav);
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p;
            }, 0);
        },
        totalCount: (state) => {
            if (state.tasks.length > 0) {
                return state.tasks.length;
            } else {
                return (state.tasks.length = 0);
            }
        },
    },
    actions: {
        async getTasks() {
            try {
                // La requête récupère tous les objets stockés en base de donnée
                // Avant de les affichés on va insérer un id équivalent à l'iD auto-généré de firebase
                // Cet id nous permettra ensuite de supprimer et modifier le contenu de l'objet
                // Et nous réattribuons la valeur du tableau "tasksList" au tableau d'origine "tasks"
                //----------------
                // The request get every objects stocked in the DB
                // Before display them we are going to inject id equal to the firebase auto-generated iD 
                // This id allow us to delete and modify the object content
                // And we reassign the "tasksList" array value to the "tasks" original one
                await axios
                    .get("https://todolistpinia-default-rtdb.firebaseio.com/tasks.json")
                    .then((response) => {
                        const data = response.data;
                        const tasksList = [];
                        for (let key in data) {
                            tasksList.push({
                                id: key,
                                ...data[key],
                            });
                            this.tasks = tasksList;
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        },
        // Requête POST pour envoyer un nouvel objet "task" créé dans "TaskForm"
        // Une fois que la promise est passée , je rappelle "getTasks()" pour mettre à jour
        // le tableau d'objet "tasks"
        // -----------
        // The POST request to send a new "task" object in "TaskForm"
        // Once the promise succeed , I callback "getTasks()" to update the "tasks" object array
        async addTask(task) {
            try {
                await axios
                    .post(
                        "https://todolistpinia-default-rtdb.firebaseio.com/tasks.json",
                        task
                    )
                    .then(() => {
                        this.getTasks();
                    });
            } catch (error) {
                console.log(error);
            }
        },
        // Récupére l'id de la prop "task" passé à l'évènement click dans "TaskDetail"
        // Le click lance également la function deleteTask
        // Une fois la requête passée, je filtre et assigne au tableau "tasks" tous les objets qui
        // n'ont pas le même id que l'argument
        //---------------------
        // I get back id from 'task' prop passed to "TaskDetail" click event.
        // The click start the function deleteTask
        // One the request succeed, I filter et assign to "tasks" array every objects which do not match the id argument
        async deleteTask(id) {
            try {
                await axios
                    .delete(
                        `https://todolistpinia-default-rtdb.firebaseio.com/tasks/${id}.json`
                    )
                    .then(() => {
                        this.tasks = this.tasks.filter((object) => object.id !== id);
                    });
                console.log("Object removed successfully from Firebase.");
            } catch (error) {
                console.error("Error updating data in Firebase:", error);
            }
        },

        //Je trouve sur le tableau "tasks" qui sélectionne et vérifie l'id
        // Je le stock dans la variable "taskFav" pour ensuite toggle la valeur de "isFav"
        //---------------------
        // I do a find on "tasks" array which is select and check the id 
        // Then, I stock it in the "taskFav" variable to toggle "isFav" value
        async toggleFav(id) {
            const taskFav = this.tasks.find((obj) => obj.id == id);
            taskFav.isFav = !taskFav.isFav;

            await axios.put(
                `https://todolistpinia-default-rtdb.firebaseio.com/tasks/${id}.json`,
                taskFav
            );
        },
        //Je trouve sur le tableau "tasks" qui sélectionne et vérifie l'id
        // Je le stock dans la variable "taskUpdate" pour ensuite toggle la valeur de "completed"
        //---------------------
        // I do a find on "tasks" array which is select and check the id 
        // Then, I stock it in the "taskUpdate" variable to toggle "completed" value
        async toggleCompleted(id) {
            const taskUpdate = this.tasks.find((obj) => obj.id == id);
            taskUpdate.completed = !taskUpdate.completed;

            await axios
                .put(
                    `https://todolistpinia-default-rtdb.firebaseio.com/tasks/${id}.json`,
                    taskUpdate
                )
        },
    },
});