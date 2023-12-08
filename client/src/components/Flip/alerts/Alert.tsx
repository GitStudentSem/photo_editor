import { useState, useEffect, useRef } from "react";

export interface AlertI {
  status: string;
}

export const Alert = ({ status }: AlertI) => {
  const [message, setMessage] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [isShow, setisShow] = useState<boolean>(false);
  const refAlert = useRef<HTMLDivElement>(null);
  const timeout = 5000;
  console.log(status, "status");
  useEffect(() => {
    if (status === "success") {
      setMessage(" Ваше изображение успешно загружено и обработано!");
      setBackgroundColor("green");
      setisShow(true);
    }
    if (status === "error") {
      setMessage(
        " Произошла ошибка! Попробуйте перезагрузить страницу и повторить операцию снова. Если ошибка не исчезла, то обратитесь в тех. службу поддержки."
      );
      setBackgroundColor("red");
      setisShow(true);
    }
  }, [status]);
  if (isShow) {
    if (refAlert.current) {
      setTimeout(() => {
        if (refAlert.current !== null) {
          refAlert.current.style.display = "none";
          setisShow(false);
        }
      }, timeout);
    }
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        padding: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "0.8s else-in-out",
        color: "white",
      }}
      ref={refAlert}
    >
      {message}
    </div>
  );
};

Alert.displayName = "Alert";
