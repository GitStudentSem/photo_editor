import {
	sendError
} from "../assets.js";
import sharp from "sharp";
import fs from "fs";

export const flip = async (req, res) => {
	try {
		if (!req.file) throw Error("Картинка не получена");

		const {
			flip,
			flop
		} = req.body;

		console.log(req.body, 'body');
		const file = req.file;

		fs.readFile(`uploads/${file.originalname}`, (err, file) => {
			if (err) {
				return;
			}


			try {
				if (flop === 'true' && flip === 'false') {
					sharp(file)
						.jpeg({
							quality: 95
						})
						.png({
							quality: 95,
							compressionLevel: 1,
							palette: true
						})
						.flop()
						.toBuffer((err, resizedBuffer) => {
							if (err) return;
							res.send(resizedBuffer);
						});
				}
				if (flip === 'true' && flop === 'false') {

					sharp(file)
						.jpeg({
							quality: 95
						})
						.png({
							quality: 95,
							compressionLevel: 1,
							palette: true
						})
						.flip()
						.toBuffer((err, resizedBuffer) => {
							if (err) return;
							res.send(resizedBuffer);
						});
				}
				if (flip === 'true' && flop === 'true') {

					sharp(file)
						.jpeg({
							quality: 95
						})
						.png({
							quality: 95,
							compressionLevel: 1,
							palette: true
						})
						.flip()
						.flop()
						.toBuffer((err, resizedBuffer) => {
							if (err) return;
							res.send(resizedBuffer);
						});
				}
			} catch (error) {
				sendError({
					defaultMessage: "Не удалось выполнить отражение",
					error,
					res,
				})
			}




			// try {
			// 	sharp(file)
			// 		.flip()
			// 		.toBuffer((err, resizedBuffer) => {
			// 			if (err) return;
			// 			res.send(resizedBuffer);
			// 		});
			// } catch (error) {
			// 	sendError({
			// 		defaultMessage: "Не удалось выполнить отражение",
			// 		error,
			// 		res,
			// 	})
			// }


		})
	} catch (error) {
		sendError({
			message: "Не удалось flip",
			error,
			res
		});
	}
};