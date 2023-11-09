import { sendError } from "../assets.js";
export const rotate = async (req, res) => {
  try {
    const { image, angle, background } = req.body;

    console.log(image, angle, background);
    res.json({ url: `/uploads` });
  } catch (error) {
    sendError({ message: "Не удалось rotate", error, res });
  }
};
