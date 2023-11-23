const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
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
  const { username,photoUrl, email, school } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      photoUrl,
      email,
      school,
    },
  });
  return res.json({ user });
});

module.exports = router;
