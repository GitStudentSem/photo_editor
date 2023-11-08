import { sendError } from "../assets.js";
import sharp from "sharp";
import * as fs from "fs";

export const negative = async (req, res) => {
  try {
    const { photo, isAlpha } = req.body;

    const output = await sharp(photo)
      .negate({ alpha: false });

    const blob = new Blob([output], { type: "image/png" });
    const editedImage = URL.createObjectURL(blob);
    fs.writeFile("../client/src/image.txt", editedImage, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Файл создан");
      }
    });

    return res.json({ editedImage });
  } catch (error) {
    sendError({ message: "Не удалось negate", error, res });
  }
};
