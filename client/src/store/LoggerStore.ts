import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react-lite";

interface ILog {
  error: Error;
  type?: "error" | "warning" | "success" | "info";
}

export interface INotification {
  text: string;
  type: "error" | "warning" | "success" | "info";
}

class LoggerStore {
  notification: INotification;

  constructor() {
    this.notification = { text: "", type: "error" };

    makeAutoObservable(this, {}, { autoBind: true });
  }

  log({ type = "error", error }: ILog) {
    if (error instanceof Error) {
      console.error(error);
      this.setNotification({ text: error.message, type });
    } else {
      console.error("Неизвестная ошибка:", error);
      this.setNotification({ text: `Неизвестная ошибка: ${error}`, type });
    }
  }

  setNotification(notification: INotification) {
    this.notification = notification;
  }

  closeNotification() {
    this.notification = { text: "", type: "error" };
  }
}

export default new LoggerStore();
