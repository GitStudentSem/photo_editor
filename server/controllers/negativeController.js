import { sendError } from "../assets.js";

export const negative = async (req, res) => {
  try {
  } catch (error) {
    sendError({ message: "Не удалось mirror", error, res });
  }
};
