import styles from "./Alert.module.scss";

interface INotification {
  status: "success" | "error";
}

const statuses: { [status: string]: string } = {
  "success": "Обработка завершена, вы можете скачать изображение",
  "error": "Возникла ошибка. Повторите попытку",
  "wait": "Идёт обработка. Подождите немного",
};

const Alert = ({ status }: INotification) => {
  return (
    <div className={styles.notification + " " + styles[status]}>
      <div className={styles.notification__wrapper}>
        <p className={styles.notification__text}>{statuses[status]}</p>
      </div>
    </div>
  );
};

export default Alert;