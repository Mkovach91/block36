const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/playlists", async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const playlist = await prisma.playlist.create({
      data: { name, description, userId: +id },
    });
    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
});