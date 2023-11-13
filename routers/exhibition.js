const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

//出品投稿api
router.post("/exhibition", async (req, res) => {
  const { textbookName, discription, sellerId } = req.body;

  if (!textbookName) {
    return res.status(400).json({ message: "教科書名がありません" });
  }
  if (!discription) {
    return res.status(400).json({ message: "説明がありません" });
  }
  try {
    const newExhibition = await prisma.textbook.create({
      data: {
        textbookName,
        discription,
        sellerId,
      },
    });
    res.status(201).json(newExhibition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//最新標品取得api
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
