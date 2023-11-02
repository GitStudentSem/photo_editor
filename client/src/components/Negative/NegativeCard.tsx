import styles from "./NegativeCard.module.css";
import { Link } from "react-router-dom";

export const NegativeCard = () => {
  return (
    <Link to='/negative' className={styles.link}>
      <div className={styles.card}>
        <div className={styles.card__wrapper}>
          <div className={styles.card__text}>NEGATIVE</div>
        </div>
      </div>
    </Link>
  );
};
