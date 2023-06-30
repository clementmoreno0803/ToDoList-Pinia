import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// Import the functions you need from the SDKs you need

const app = createApp(App)

app.use(createPinia())

app.mount('#app')