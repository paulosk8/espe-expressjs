require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany();

  const demoUsers = [
    {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: "admin123",
      role: "ADMIN",
    },
    {
      name: "Julian Galarza",
      email: "julian.galarza@example.com",
      password: "user123",
      role: "USER",
    },
    {
      name: "Karol Gilces",
      email: "karol.gilces@example.com",
      password: "user123",
      role: "USER",
    },
  ];
  for (const user of demoUsers) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log("Usuarios de demostración creados con éxito");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
