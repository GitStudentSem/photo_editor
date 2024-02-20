import { FC, InputHTMLAttributes } from "react";
import s from "./checkbox.module.css";
import checkIcon from "../../icons/checkIcon.svg";
import { observer } from "mobx-react-lite";

export interface IPropsCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export const _Checkbox: FC<IPropsCheckbox> = ({ text, ...props }) => {
  return (
    <label className={s.container}>
      <input className={s.input} type='checkbox' {...props} />
      <span className={s.checkmark}>
        <img src={checkIcon} />
      </span>
      <span className={s.text}>{text}</span>
    </label>
  );
};

export const Checkbox = observer(_Checkbox);
