import styles from "./FlipCard.module.css";
import { Link } from "react-router-dom";

type Props = {
  flipX: boolean;
  flipY?: boolean | undefined;
};

export const FlipCard = ({ flipX = true, flipY = false }: Props) => {
  let text;
  let flipEffects;

  if (flipX) {
    text = "FLIP-X";
    flipEffects = styles.cardX;
  }
  if (flipY) {
    text = "FLIP-Y";
    flipEffects = styles.cardY;
  }

  if (flipX && flipY) {
    text = "FLIP-XY";
    flipEffects = styles.cardXY;
  }

  const FLIP = (text?: string, flipEffects?: string) => {
    return (
      <div className={`${styles.card} ${flipEffects}`}>
        <div className={styles.card__wrapper}>
          <div className={styles.card__text}>{text}</div>
        </div>
      </div>
    );
  };

  return (
    <Link to='/flip' className={styles.link}>
      {FLIP(text, flipEffects)}
    </Link>
  );
};
