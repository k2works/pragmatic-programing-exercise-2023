import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { irises } from "./csvReader";

async function main() {
  for (const iris of irises) {
    console.log(iris)
    await prisma.iris.upsert({
      where: { id: iris.id },
      update: {},
      create: {
        sepal_length: iris.sepal_length,
        sepal_width: iris.sepal_width,
        petal_length: iris.petal_length,
        petal_width: iris.petal_width,
        species: iris.species,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
