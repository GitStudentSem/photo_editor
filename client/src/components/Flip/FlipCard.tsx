import styles from "./styles/FlipCard.module.css";
import { Link } from "react-router-dom";
export const FlipCard = () => {
  const text = "FLIP & FLOP";
  const flipEffects = styles.cardX;
  return (
    <Link to='/flip' className={styles.link}>
      <div className={`${styles.card} ${flipEffects}`}>
        <div className={styles.card__wrapper}>
          <div className={styles.card__text}>{text}</div>
        </div>
      </div>
    </Link>
  );
};
