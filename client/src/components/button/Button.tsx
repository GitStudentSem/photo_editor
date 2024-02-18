import s from "./button.module.css";
import { ButtonHTMLAttributes } from "react";

interface IPropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  beforeIcon?: string;
  afterIcon?: string;
}

const Button: React.FC<IPropsButton> = ({
  text,
  beforeIcon,
  afterIcon,
  ...props
}: IPropsButton) => {
  return (
    <button className={s.button} {...props}>
      {beforeIcon && <img src={beforeIcon} />}
      <span className={s.text}>{text}</span>
      {afterIcon && <img src={afterIcon} />}
    </button>
  );
};
export { Button };
