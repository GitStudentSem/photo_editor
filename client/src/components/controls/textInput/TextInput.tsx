import { useState } from "react";
import type { FC, InputHTMLAttributes } from "react";
import s from "./textInput.module.css";
import errorIcon from "../../../icons/errorIcon.svg";
import { observer } from "mobx-react-lite";

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required: boolean;
  label: string;
  type: "number" | "text" | "password" | "email";
}

const _TextInput: FC<ITextInputProps> = ({ label, required, ...props }) => {
  const [isError, setIsError] = useState(false);
  const errorClass = isError ? s.error : "";
  console.log("text input");
  return (
    <label className={s.label}>
      <p className={s.label_text}>{label}</p>

      <div className={s.input_wrapper}>
        <input className={`${s.input} ${errorClass}`} {...props} />
        {isError && <img className={s.input_icon} src={errorIcon} alt='' />}
      </div>

      {required && (
        <p className={s.support_text}>Поле обязательно к заполнению</p>
      )}
    </label>
  );
};

export const TextInput = observer(_TextInput);
