import { sendError } from "../assets.js";
import sharp from "sharp";

export const negative = async (req, res) => {
  try {
    if (!req.files) throw Error("Изобраения не были получены");

    const imageBuffers = req.files.map((file) => file.buffer);
    const { alpha } = req.body;

    const processedImages = await Promise.all(
      imageBuffers.map(async (buffer) => {
        return await sharp(buffer).negate(Boolean(alpha)).toBuffer();
      })
    );

    res.send(processedImages);
  } catch (error) {
    sendError({
      defaultMessage: "Не удалось обработать изображение",
      error,
      res,
    });
  }
};
