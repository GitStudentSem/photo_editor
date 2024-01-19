import styles from "./Checkbox.module.css";

interface ICheckbox {
  required?: boolean;
  onChange?: (prev: any) => void;
  disabled?: boolean;
}

const Checkbox = ({ required, onChange, disabled }: ICheckbox) => {
  return (
    <>
      <input type="checkbox"
             required={required}
             onChange={onChange}
             disabled={disabled}
             className={styles.input} />
    </>
  );
};

export default Checkbox;