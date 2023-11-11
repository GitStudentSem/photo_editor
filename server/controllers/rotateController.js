import { sendError } from "../assets.js";
import fs from "fs";
import sharp from "sharp";

export const rotate = async (req, res) => {
  try {
    if (!req.file) throw Error("Картинка не получена");

    const { angle, background } = req.body;

    fs.readFile(`uploads/${req.file.originalname}`, (err, data) => {
      if (err) throw new Error(err);

      sharp(data)
        .rotate(+angle, { background })
        .toBuffer((err, resizedBuffer) => {
          if (err) throw new Error(err);

          res.send(resizedBuffer);
        });
    });
  } catch (error) {
    sendError({ defaultMessage: "Не удалось выполнить поворот", error, res });
  }
};
