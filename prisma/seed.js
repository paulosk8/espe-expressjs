require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  /*   const demoUsers = [
    {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
    },
    {
      name: "Julian Galarza",
      email: "julian.galarza@example.com",
    },
    {
      name: "Karol Gilces",
      email: "karol.gilces@example.com",
    },
  ];
  for (const user of demoUsers) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log("Usuarios de demostración creaqdos con éxito"); */
  await prisma.user.deleteMany();
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
