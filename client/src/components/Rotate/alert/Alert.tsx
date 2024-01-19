import s from "./alert.module.css";
import infoIcon from "../../../icons/infoIcon.svg";
import errorIcon from "../../../icons/errorIconOutlined.svg";
import successIcon from "../../../icons/successIcon.svg";
import warnIcon from "../../../icons/warnIcon.svg";
import closeIcon from "../../../icons/closeIcon.svg";
import { observer } from "mobx-react-lite";
import LoggerStore from "../store/LoggerStore";

const iconsEnum = {
  info: infoIcon,
  error: errorIcon,
  success: successIcon,
  warning: warnIcon,
};
export const Alert = observer(() => {
  return (
    <div className={`${s.wrapper} ${s[LoggerStore.notification.type]}`}>
      <div className={s.text_wrapper}>
        <img src={iconsEnum[LoggerStore.notification.type]} />
        <span className={s.text}>{LoggerStore.notification.text}</span>
      </div>

      <img
        className={s.close_icon}
        src={closeIcon}
        onClick={LoggerStore.closeNotification}
      />
    </div>
  );
});
