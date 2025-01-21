import {createApp, defineAsyncComponent} from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { startMockServer } from "./mockServer/mockServer.js";

startMockServer();

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.component('UiInput', defineAsyncComponent(() =>
    import('./components/ui/UiInput.vue')
))
app.component('UiButton', defineAsyncComponent(() =>
    import('./components/ui/UiButton.vue')
))
app.component('UiSelect', defineAsyncComponent(() =>
    import('./components/ui/UiSelect.vue')
))
app.component('UiCheckbox', defineAsyncComponent(() =>
    import('./components/ui/UiCheckbox.vue')
))

app.mount('#app')
