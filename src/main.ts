import { createApp } from "vue";
import App from "./App.vue";
import "./styles/app.css";

// primevue
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(PrimeVue);

app.mount("#app");
