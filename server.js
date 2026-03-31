import express from "express";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

// connect DB

app.get("/", (req, res) => {
    res.send("Server + DB OK");
});

app.listen(3000, () => {
    console.log("Server running...");
    connectDB();
});
