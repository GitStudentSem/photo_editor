import s from "./alert.module.css";
import infoIcon from "../../icons/infoIcon.svg";
import errorIcon from "../../icons/errorIconOutlined.svg";
import successIcon from "../../icons/successIcon.svg";
import warnIcon from "../../icons/warnIcon.svg";
import closeIcon from "../../icons/closeIcon.svg";

interface IPropsAlert {
  text: string;
  onClose: () => void;
  type?: "error" | "warning" | "success" | "info";
}

const iconsEnum = {
  info: infoIcon,
  error: errorIcon,
  success: successIcon,
  warning: warnIcon,
};
export const Alert = ({ text, type = "error", onClose }: IPropsAlert) => {
  return (
    <div className={`${s.wrapper} ${s[type]}`}>
      <div className={s.text_wrapper}>
        <img src={iconsEnum[type]} />
        <span className={s.text}>{text}</span>
      </div>

      <img className={s.close_icon} src={closeIcon} onClick={onClose} />
    </div>
  );
};
