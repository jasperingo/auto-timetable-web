import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(Toast);

app.mount("#app");
