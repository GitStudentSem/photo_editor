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
    <button type='button' className={s.button} {...props} tabIndex={0}>
      {beforeIcon && <img src={beforeIcon} alt='icon before' />}
      <span className={s.text}>{text}</span>
      {afterIcon && <img src={afterIcon} alt='icon after' />}
    </button>
  );
};
export const Button = observer(_Button);
