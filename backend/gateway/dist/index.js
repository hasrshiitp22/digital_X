import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.json('hello from digital----boook --- store ');
});
app.listen(PORT, () => {
    console.log(`Gateway Server running on http://localhost:${PORT}`);
});
