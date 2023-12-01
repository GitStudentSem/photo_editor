export interface ButtonI {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  text?: string;
}

export const Button = ({ type, className, text }: ButtonI) => {
  return (
    <button type={type} className={className}>
      {text}
    </button>
  );
};

Button.displayName = "Button";
