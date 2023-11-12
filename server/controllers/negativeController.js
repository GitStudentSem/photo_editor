import { sendError } from "../assets.js";
import sharp from "sharp";
import fs from "fs";

export const negative = async (req, res) => {
  if (!req.file) throw Error("Фото не получено");

  fs.readFile(`uploads/${req.file.originalname}`, (err, data) => {
    if (err) return;

    try {
      sharp(data)
        .negate({ alpha: true })  //нужно доработать отправку alpha с клиента
        .toBuffer((err, resizedBuffer) => {
          if (err) return;

          res.send(resizedBuffer);
        });
    } catch (error) {
      sendError({ defaultMessage: "Не удалось negate", error, res });
    }
  });
};
