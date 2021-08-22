import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev, app }) => {
  if (!isDev){
    Vue.use(VueGtag, {
        config: { id: 'G-6PYSD7GN9Z' }
      },
      app.router);
  } else {
    console.log("Skipping GA in development")
  }
}
