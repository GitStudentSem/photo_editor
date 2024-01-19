import s from "./checkbox.module.css";
import checkIcon from "../../icons/checkIcon.svg";

interface IPropsCheckbox {
  text: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}
export const Checkbox = ({
  text,
  checked,
  onChange,
  disabled,
}: IPropsCheckbox) => {
  return (
    <label className={s.container}>
      <input
        className={s.input}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={s.checkmark}>
        <img src={checkIcon} />
      </span>
      <span className={s.text}>{text}</span>
    </label>
  );
};
