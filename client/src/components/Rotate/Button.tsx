import s from "./button.module.css";
import { MouseEvent } from "react";

interface IPropsButton {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  beforeIcon?: string;
  afterIcon?: string;
}
const Button = ({
  text,
  onClick,
  disabled,
  beforeIcon,
  afterIcon,
}: IPropsButton) => {
  return (
    <button onClick={onClick} className={s.button} disabled={disabled}>
      {beforeIcon && <img src={beforeIcon} />}
      <span className={s.text}>{text}</span>
      {afterIcon && <img src={afterIcon} />}
    </button>
  );
};
export { Button };
