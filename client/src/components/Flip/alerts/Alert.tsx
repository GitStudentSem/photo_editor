import { useState, useEffect } from "react";

export interface AlertI {
  status?: string | undefined;
}

export const Alert = ({ status }: AlertI) => {
  //   const [time, setTime] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [one, setOne] = useState<string | undefined>(status);
  //   const status111 = status;

  useEffect(() => {
    setOne(status);
  }, []);
  console.log(one, "afasf");
  if (one === "success" || one === "error") {
    if (one === "success") {
      setMessage(" Ваше изображение успешно загружено и обработано!");
      setBackgroundColor("green");
    }
    if (one === "error") {
      setMessage(" Произошла ошибка!");
      setBackgroundColor("red");
    }
    console.log(one, "afasf");
    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          padding: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "0.3s else-in-out",
        }}
      >
        {message}
      </div>
    );
  }
};

Alert.displayName = "Alert";
