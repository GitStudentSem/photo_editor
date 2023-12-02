import { sendError } from "../assets.js";
import sharp from "sharp";
import fs from "fs";

export const negative = async (req, res) => {
  if (!req.file) throw Error("Фото не получено");

  const { alpha } = req.body;

  fs.readFile(`uploads/${req.file.originalname}`, (err, data) => {
    if (err) return;

    try {
      sharp(data)
        .negate({ alpha: Boolean(alpha) })
        .toBuffer((err, resizedBuffer) => {
          if (err) return;

          res.send(resizedBuffer);
        });
    } catch (error) {
      sendError({ defaultMessage: "Не удалось negate", error, res });
    }
  });
};
