import { sendError } from "../assets.js";
import sharp from "sharp";

const imageProcessingMethods = {
  //методы для обработки
  negative: async (buffer, params) => {
    return await sharp(buffer).negate(params.negate).toBuffer();
  },
  rotate: async (buffer, params) => {
    return await sharp(buffer).rotate(params.rotate).toBuffer();
  },
};

export const root = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.files) throw Error("Изображения или параметры не были получены");

    const imageBuffers = req.files.map((file) => file.buffer);
    const { options } = req.body;
    // Обработка каждого изображения с помощью каждого метода
    const processedImages = await Promise.all(
      imageBuffers.map(async (buffer) => {
        const processed = await Promise.all(
          options.map(async (option) => {
            const { method, ...params } = option;

            if (!imageProcessingMethods[method])
              throw Error(`Метод обработки "${method}" не найден`);

            return await imageProcessingMethods[method](buffer, params);
          })
        );

        return processed;
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
