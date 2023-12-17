const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//いいねapi
router.post("/create_favorite", async (req, res) => {
  const { sellerId, textbookId } = req.body;
  try {
    const favorite = await prisma.good.create({
      data: {
        sellerId,
        textbookId,
      },
    });
    return res.json({ favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//いいね取得api
router.post("/get_favorite", async (req, res) => {
  const { sellerId, textbookId } = req.body;
  try {
    const favorite = await prisma.good.findFirst({
      where: {
        sellerId: sellerId,
        textbookId: textbookId,
      },
    });
    return res.json({ favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//いいね削除api
router.post("/delete_favorite", async (req, res) => {
  const { sellerId, textbookId } = req.body;
  try {
    const favorite = await prisma.good.deleteMany({
      where: {
        sellerId: sellerId,
        textbookId: textbookId,
      },
    });
    return res.json({ favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//いいねした商品取得api
router.post("/get_favoriteTextbook", async (req, res) => {
  const { userId } = req.body;
  try {
    const favorite = await prisma.good.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        textbook: true,
        textbook: {
          include: {
            seller: true,
          },
        },
      },
    });
    return res.json({ favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
