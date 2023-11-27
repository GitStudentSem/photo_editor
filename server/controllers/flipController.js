import {
	sendError
} from "../assets.js";
import sharp from "sharp";
import fs from "fs";

export const flip = async (req, res) => {
	try {
		if (!req.files[0]) throw Error("Картинка не получена");
		// const arrFiles = [];
		const file = req.files[0];
		// console.log(files, 'files');

		fs.readFile(`uploads/${file.originalname}`, (err, file) => {
			if (err) {
				return;
			}
			try {
				sharp(file)
					.flop()
					.toBuffer((err, resizedBuffer) => {
						if (err) return;
						res.send(resizedBuffer);
					});

			} catch (error) {
				sendError({
					defaultMessage: "Не удалось выполнить поворот",
					error,
					res,
				});
			}
		});

		res.status(200)

	} catch (error) {
		sendError({
			message: "Не удалось flip",
			error,
			res
		});
	}
};