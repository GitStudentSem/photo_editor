import { sendError } from "../assets.js";
export const rotate = async (req, res) => {
  try {
    const { image, angle, background } = req.body;

    console.log(image, angle, background);
    res.status(200).json({ success: true });
  } catch (error) {
    sendError({ message: "Не удалось rotate", error, res });
  }
};
