const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//出品投稿api
router.post("/exhibition", async (req, res) => {
  const { textbookName, textbookImg, discription, schoolCode, sellerId } =
    req.body;

  if (!textbookName) {
    return res.status(400).json({ message: "教科書名がありません" });
  }
  if (!textbookImg) {
    return res.status(400).json({ message: "画像がありません" });
  }
  if (!discription) {
    return res.status(400).json({ message: "説明がありません" });
  }
  try {
    const newExhibition = await prisma.textbook.create({
      data: {
        textbookName,
        discription,
        textbookImg,
        schoolCode,
        sellerId,
      },
    });
    res.status(201).json(newExhibition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//出品取得api
router.get("/get_textbooks", async (req, res) => {
  const { schoolCode } = req.body;
  try {
    const textbooks = await prisma.textbook.findMany({
      where: {
        schoolCode: schoolCode,
      },
      include: {
        seller: true,
      },
    });
    return res.json(textbooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//自分の出品取得api
router.post("/get_mytextbooks", async (req, res) => {
  const { userId } = req.body;
  try {
    const textbooks = await prisma.textbook.findMany({
      where:{
        sellerId:userId
      },
      include: {
        seller: true,
      },
    });
    return res.json(textbooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
