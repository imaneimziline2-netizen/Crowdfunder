import express from "express";
import connectDB from "./config/db.js";
import dotenv from'dotenv';
import authRoutes from'./routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import investmentRoutes from './routes/investmentRoutes.js';


dotenv.config();
connectDB ();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/investments', investmentRoutes);


app.use('/api/projects', projectRoutes);

app.get("/", (req, res) => {
    res.send("Server + DB OK");
});

app.listen(3000, () => {
    console.log("Server running...");
    connectDB();
});
