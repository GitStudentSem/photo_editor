import { AnchorHTMLAttributes } from "react";
import s from "./link.module.css";

interface IPropsLink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}
const Link: React.FC<IPropsLink> = ({ text, ...props }: IPropsLink) => {
  return (
    <a tabIndex={0} className={s.link} {...props}>
      {text}
    </a>
  );
};

export { Link };
