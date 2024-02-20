import { FC, AnchorHTMLAttributes } from "react";
import s from "./link.module.css";
import { observer } from "mobx-react-lite";

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

const _Link: FC<ILinkProps> = ({ text, ...props }) => {
  return (
    <a tabIndex={0} className={s.link} {...props}>
      {text}
    </a>
  );
};

export const Link = observer(_Link);
