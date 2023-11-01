import { sendError } from "../assets.js";

export const flip = async (req, res) => {
  try {
  } catch (error) {
    sendError({ message: "Не удалось flip", error, res });
  }
};
