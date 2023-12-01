import styles from "./Notification.module.scss";

interface INotification {
  type: "success" | "error";
}

const types: { [type: string]: string } = {
  "success": "Обработка завершена, вы можете скачать изображение",
  "error": "Возникла ошибка. Повторите попытку",
};

const Notification = ({ type }: INotification) => {
  // const [currentType, setCurrentType] = useState<'success' | 'error' | null>(null);
  return (
    <div className={styles.notification + " " + styles[type]}>
      <div className={styles.notification__wrapper}>
        <p className={styles.notification__text}>{types[type]}</p>
      </div>
    </div>
  );
};

export default Notification;