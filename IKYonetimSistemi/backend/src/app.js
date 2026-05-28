import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import personelRoutes from "./routes/personel.routes.js";

dotenv.config();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use(express.json());

app.use("/api/personel", personelRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("HRMS Backend API Çalışıyor");
});

app.listen(PORT, () => {
  console.log(
    `Server çalışıyor: http://localhost:${PORT}`
  );
});