import { sendError } from "../assets.js";
import fs from "fs";
import sharp from "sharp";

// export const rotate = async (req, res) => {
//   try {
//     if (!req.files) throw Error("Картинка не получена");
//     const { angle, background } = req.body;

//     for (let i = 0; i < req.files.length; i++) {
//       const file = req.files[i];

//       fs.readFile(`uploads/${file.originalname}`, (err, data) => {
//         if (err) {
//           return;
//         }
//         try {
//           sharp(data)
//             .rotate(+angle, {
//               background: background || "transparent", // проблема с прозрачностью
//             })
//             .toBuffer((err, resizedBuffer) => {
//               if (err) return;

//               res.send(resizedBuffer);
//             });
//         } catch (error) {
//           sendError({
//             defaultMessage: "Не удалось выполнить поворот",
//             error,
//             res,
//           });
//         }
//       });
//     }
//   } catch (error) {
//     sendError({
//       defaultMessage: "Не удалось выполнить поворот",
//       error,
//       res,
//     });
//   }
// };

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
