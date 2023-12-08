import { ChangeEvent } from "react";

export interface InputI {
  type?: string;
  id?: string;
  multiple?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  accept?: string;
  value?: string | React.ComponentState;
  refInput?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  hidden?: boolean;
  checked?: boolean;
}

export const Input = ({
  type,
  id,
  multiple,
  onChange,
  className,
  name,
  accept,
  value,
  refInput,
  hidden,
  checked,
}: InputI) => {
  return (
    <input
      type={type}
      id={id}
      multiple={multiple}
      onChange={onChange}
      className={className}
      name={name}
      accept={accept}
      value={value}
      ref={refInput}
      disabled={false}
      hidden={hidden}
      checked={checked}
    />
  );
};
Input.displayName = "Input";
