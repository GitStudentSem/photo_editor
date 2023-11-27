import { ChangeEvent } from "react";

export interface InputProps {
  type: string;
  id: string;
  multiple?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
  accept?: string;
  value?: string | React.ComponentState;
  ref1?: React.RefObject<HTMLInputElement>;
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
  ref1,
}: InputProps) => {
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
      ref={ref1}
    />
  );
};
