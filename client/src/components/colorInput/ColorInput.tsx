import { FC, InputHTMLAttributes } from "react";
import s from "./colorInput.module.css";
import { observer } from "mobx-react-lite";

export interface IPropsColorInput
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}
const _ColorInput: FC<IPropsColorInput> = ({
  label,
  required,
  value,
  ...props
}) => {
  return (
    <label className={s.label}>
      <div className={s.input_wrapper}>
        <input className={s.input} type='color' {...props} />
        <div
          style={{
            backgroundColor: value?.toString(),
          }}
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
export const ColorInput = observer(_ColorInput);
