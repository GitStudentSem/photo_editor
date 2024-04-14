import { sendError } from "../assets.js";
import fs from "fs";
import sharp from "sharp";

export const rotate = async (req, res) => {
  try {
    if (!req.files) throw Error("Изобраения не были получены");

    const imageBuffers = req.files.map((file) => file.buffer);
    const { angle, background } = req.body;

    const rotatedImages = await Promise.all(
      imageBuffers.map(async (buffer) => {
        return await sharp(buffer)
          .rotate(+angle, {
            background: background || "transparent", // проблема с прозрачностью
          })
          .toBuffer();
      })
    );

    res.send(rotatedImages);
  } catch (error) {
    sendError({
      defaultMessage: "Не удалось выполнить поворот",
      error,
      res,
    });
  }
};
