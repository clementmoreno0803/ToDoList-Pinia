import firebase from "firebase";
import { ref, unmounted } from vue;

const config = {
    apiKey: "AIzaSyALTKclhdbSe1YCE1vcSFQSPJbkfMooNKw",
    authDomain: "todolistpinia.firebaseapp.com",
    databaseURL: "https://todolistpinia-default-rtdb.firebaseio.com",
    projectId: "todolistpinia",
    storageBucket: "todolistpinia.appspot.com",
    messagingSenderId: "662489449553",
    appId: "1:662489449553:web:1ed1f52d4c1fd834eae470"
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()
const userCollection = db.collection('tasks')

export const AddTask = task => { return userCollection.add(task) }