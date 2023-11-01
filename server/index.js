import express from "express";
import cors from "cors";

import * as photoController from "./controllers/index.js";
// http://localhost:3333/flip
const app = express();
app.use(cors());
app.use(express.json());

app.post("/flipflop", photoController.flip);
app.post("/rotate", photoController.rotate);
app.post("/negative", photoController.negative);

app.listen(3333, (err) => {
  if (err) {
    return console.log("Ошибка запуска сервера", err);
  }
  console.log("Server OK");
});
