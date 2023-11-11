const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/openai", openaiRoutes);

app.listen(port, async () => {
  await db;
  console.log("DB connected");
  console.log(`Server is running on port ${port}`);
});
