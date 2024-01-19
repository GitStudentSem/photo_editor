import {
	sendError
} from "../assets.js";
import sharp from "sharp";
import fs from "node:fs";

export const flip = async (req, res) => {

	try {
		console.log(req.file, 'file');
		if (!req.file) throw Error("Фото не получено");

		const folderName = 'uploads';
		const {
			flip,
			flop
		} = req.body;

		try {
			if (!fs.existsSync(folderName)) {
				fs.mkdirSync(folderName);
				fs.readFile(`${folderName}/${req.file.originalname}`, (err, data) => {
					if (err) return;

					try {
						if (flip) {
							sharp(data)
								.flip()
								.toBuffer((err, resizedBuffer) => {
									if (err) return;

									res.send(resizedBuffer);
								});
						}
						if (flop) {
							sharp(data)
								.flop()
								.toBuffer((err, resizedBuffer) => {
									if (err) return;

									res.send(resizedBuffer);
								});
						}
						if (flip && flop) {
							sharp(data)
								.flip()
								.flop()
								.toBuffer((err, resizedBuffer) => {
									if (err) return;

									res.send(resizedBuffer);
								});
						}
					} catch (error) {
						sendError({
							defaultMessage: "Не удалось negate",
							error,
							res
						});
					}
				});
				console.log(34234234);
			}
		} catch (error) {
			sendError({
				defaultMessage: "Не удалось выполнить операцию",
				error,
				res
			});
		}
	} catch (error) {
		sendError({
			defaultMessage: "Не удалось выполнить операцию",
			error,
			res
		});
	}
}