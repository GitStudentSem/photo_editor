import { useState } from "react";
import s from "./colorInput.module.css";

interface IPropsColorInput {
  label: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}

export const ColorInput = ({
  label,
  name,
  disabled,
  required,
}: IPropsColorInput) => {
  const [value, setValue] = useState("#ffffff");

  return (
    <label className={s.label}>
      <div className={s.input_wrapper}>
        <input
          className={s.input}
          type='color'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name={name}
          disabled={disabled}
        />
        <div
          style={{ backgroundColor: !disabled ? value : "transparent" }}
          className={s.color_view}
        />

        <p className={s.label_text}>{label}</p>
      </div>

      {required && (
        <p className={s.support_text}>Поле обязательно к заполнению</p>
      )}
    </label>
  );
};
