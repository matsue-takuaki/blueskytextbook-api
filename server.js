const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routers/auth");
const productRoute = require("./routers/exhibition");
const goodRoute = require("./routers/good");
const messageRoute = require("./routers/message");

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/good", goodRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`server is runninng on Port ${PORT}`);
});
