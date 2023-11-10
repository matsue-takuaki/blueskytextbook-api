const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routers/auth")

const PORT = 5000;


app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoute);


app.listen(PORT, () => {
  console.log(`server is runninng on Port ${PORT}`);
});
