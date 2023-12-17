const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//メッセージ作成api
router.post("/create_messages", async (req, res) => {
  const { sellerId, buyerId, textbookId } = req.body;
  try {
    const messages = await prisma.messages.create({
      data: {
        textbookId,
        sellerId,
        buyerId,
      },
    });
    await prisma.connection.create({
      data: {
        userId: sellerId,
        messagesId: messages.id,
      },
    });
    await prisma.connection.create({
      data: {
        userId: buyerId,
        messagesId: messages.id,
      },
    });
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//メッセージ取得api
router.post("/get_messages", async (req, res) => {
  const { sellerId, buyerId, textbookId } = req.body;
  try {
    const messages = await prisma.messages.findFirst({
      where: {
        textbookId,
        sellerId,
        buyerId,
      },
      include: {
        message: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            sender: true,
          },
        },
      },
    });
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//すべてのメッセージ取得api
router.post("/get_allMessages", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        connection: {
          select: {
            messages: {
              include: {
                message: {
                  orderBy: {
                    createdAt: "asc",
                  },
                },
                connection: {
                  select: {
                    user: true,
                  },
                  where: {
                    userId: {
                      not: userId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    const messages = user.connection;
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//すべてのメッセージ取得api
router.post("/get_allMessages2", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        connection: {
          select: {
            messages: true,
          },
        },
      },
    });
    return res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//メッセージ作成api
router.post("/create_message", async (req, res) => {
  const { message, senderId, messageId } = req.body;
  try {
    const messageText = await prisma.message.create({
      data: {
        message,
        senderId,
        messageId,
      },
      include: {
        sender: true,
      },
    });
    return res.json({ messageText });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//既読に修正api
router.post("/confirmMessage", async (req, res) => {
  const { messageId } = req.body;
  try {
    const message = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        confirm: true,
      },
    });
    return res.json({ message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

//相手のメッセージを既読に修正api
router.post("/confirm_AllMessage", async (req, res) => {
  const { sellerId, buyerId, textbookId ,userId } = req.body;
  try {
    await prisma.messages
      .findFirst({
        where: {
          textbookId,
          sellerId,
          buyerId,
        },
        include: {
          message: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })
      .then((responce) => {
        responce.message.map(async (message) => {
          if (!message.confirm && message.senderId != userId) {
            await prisma.message.update({
              where: {
                id: message.id,
              },
              data: {
                confirm: true,
              },
            });
          }
        });
      });
    const messages = await prisma.messages.findFirst({
      where: {
        textbookId,
        sellerId,
        buyerId,
      },
      include: {
        message: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            sender: true,
          },
        },
      },
    });
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
