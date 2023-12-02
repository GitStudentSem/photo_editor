export interface ButtonI {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  type,
  className,
  text,
  onClick,
  disabled,
}: ButtonI) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.displayName = "Button";
