import { useState } from "react";
import s from "./textInput.module.css";
import errorIcon from "../../../icons/errorIcon.svg";

interface IPropsTextInput {
  label: string;
  type: "number" | "text" | "password";
  name: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export const TextInput = ({
  placeholder,
  label,
  type,
  name,
  disabled,
  required,
}: IPropsTextInput) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const errorClass = isError ? s.error : "";

  return (
    <label className={s.label}>
      <p className={s.label_text}>{label}</p>

      <div className={s.input_wrapper}>
        <input
          className={`${s.input} ${errorClass}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name={name}
          disabled={disabled}
        />
        {isError && <img className={s.input_icon} src={errorIcon} />}
      </div>

      {required && (
        <p className={s.support_text}>Поле обязательно к заполнению</p>
      )}
    </label>
  );
};
