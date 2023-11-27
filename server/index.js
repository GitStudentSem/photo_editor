import express from "express";
import cors from "cors";
import * as photoController from "./controllers/index.js";
import bodyParser from "body-parser";
import fileLoader from "./midlewares/file.js";
import path from "path";
import {
	fileURLToPath
} from "url";

const __filename = fileURLToPath(
	import.meta.url);
const __dirname = path.dirname(__filename);
// http://localhost:3333/flip
const app = express();
app.use(cors());

// for parsing application/json
app.use(bodyParser.json({
	extended: true
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/flip", fileLoader.array("image", 10), photoController.flip);
app.post("/rotate", fileLoader.single("image"), photoController.rotate);
app.post("/negative", photoController.negative);

app.listen(3333, (err) => {
	if (err) {
		return console.log("Ошибка запуска сервера", err);
	}
	console.log("Server OK");
});