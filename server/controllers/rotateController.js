import { sendError } from "../assets.js";

export const rotate = async (req, res) => {
  try {
  } catch (error) {
    sendError({ message: "Не удалось rotate", error, res });
  }
};
