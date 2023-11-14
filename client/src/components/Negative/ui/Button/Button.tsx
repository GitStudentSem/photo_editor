import styles from "./Button.module.css";
import { MouseEvent, ReactNode } from "react";

interface IButton {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({ onClick, text, disabled, children }: IButton) => {
  return (
    <button className={styles.button}
            onClick={onClick}
            disabled={disabled}>
      {text ? <span className={styles.button__text}>{text}</span> : children}
    </button>
  );
};

export default Button;