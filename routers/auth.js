const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

//ユーザー取得api
router.post("/get", async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  return res.json({ user });
});

//新規ユーザー登録api
router.post("/register", async (req, res) => {
  const { username, email, school } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      school,
    },
  });
  return res.json({ user });
});

//ユーザーログインapi
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return res.json({ token });
});

module.exports = router;
