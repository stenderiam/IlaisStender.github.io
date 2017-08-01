
import TodoBuilder from './modules/todoBuilder.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then((registration) => {
      console.log('Server Worker Registered', registration);
    })
    .catch((err) => {
      console.log('Service Worker failed to Register', err);
    });
}

new TodoBuilder();

