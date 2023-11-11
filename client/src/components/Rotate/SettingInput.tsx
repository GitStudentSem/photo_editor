import { useState } from "react";
import s from "./settingInput.module.css";
import errorIcon from "../../icons/errorIcon.svg";

interface IPropsSettingInput {
  placeholder: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  disabled?: boolean;
}

export const SettingInput = ({
  placeholder,
  label,
  type,
  name,
  disabled,
}: IPropsSettingInput) => {
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

      <p className={s.support_text}>Поле обязательно к заполнению</p>
    </label>
  );
};
