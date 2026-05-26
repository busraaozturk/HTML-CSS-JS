import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import personelRoutes from "./routes/personel.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/personeller", personelRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("HRMS Backend API Çalışıyor");
});

app.listen(PORT, () => {
  console.log(
    `Server çalışıyor: http://localhost:${PORT}`
  );
});