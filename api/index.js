import express from "express";
import weatherRoutes from "./routes/weather.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/weather", weatherRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
