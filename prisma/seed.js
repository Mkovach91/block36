const prisma = require("../prisma");

const seed = async () => {
  for (let index = 0; index < 3; index++) {
    const playlists = [];
    for (let j = 0; j < 5; j++) {
      playlists.push({
        name: `Playlist ${index}${j}`,
        description: `Description for Playlist ${index}${j}`,
      });
    }
    await prisma.user.create({
      data: {
        username: `User ${index + 1}`, 
        playlists: {
          create: playlists,
        },
      },
    });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });