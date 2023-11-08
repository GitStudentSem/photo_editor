import express from "express";
import cors from "cors";
import * as photoController from "./controllers/index.js";
import bodyParser from "body-parser";
import multer from "multer";

const upload = multer();
// http://localhost:3333/flip
const app = express();
app.use(cors());
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.post("/flipflop", photoController.flip);
app.post("/rotate", photoController.rotate);
app.post("/negative", photoController.negative);

app.listen(3333, (err) => {
  if (err) {
    return console.log("Ошибка запуска сервера", err);
  }
  console.log("Server OK");
});
