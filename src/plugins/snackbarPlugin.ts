import { reactive, type App } from 'vue';

interface Snackbar {
  show: boolean;
  message: string;
  color: string;
  timeout: number;
}

interface ShowSnackbar {
  (message: string, color?: string, timeout?: number): void;
}

export default {
  install(app: App) {
    const snackbar: Snackbar = reactive({
      show: false,
      message: '',
      color: 'error',
      timeout: 3000,
    });


    const showMessage: ShowSnackbar = (message, color = 'error', timeout = 3000) => {
      snackbar.message = message;
      snackbar.color = color;
      snackbar.timeout = timeout;
      snackbar.show = true;
    };

    app.provide('snackbar', snackbar);
    app.provide('showSnackbar', showMessage);
  },
};
