import { FC, ButtonHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";
import s from "./button.module.css";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  beforeIcon?: string;
  afterIcon?: string;
}

const _Button: FC<IButtonProps> = ({
  text,
  beforeIcon,
  afterIcon,
  ...props
}) => {
  return (
    <button className={s.button} {...props}>
      {beforeIcon && <img src={beforeIcon} />}
      <span className={s.text}>{text}</span>
      {afterIcon && <img src={afterIcon} />}
    </button>
  );
};
export const Button = observer(_Button);
