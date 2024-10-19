import express from "express";
import weatherRoutes from "./routes/weather.route.js";
import postRoute from "./routes/discussion.route.js";
import authRoutes from "./routes/auth.route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err);
    });

app.use('/api/auth', authRoutes);
app.use("/api/post",postRoute)
app.use("/api/weather", weatherRoutes); 




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});