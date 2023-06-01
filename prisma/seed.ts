import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { cinemas, irises, surviveds } from "./csvReader";

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

  for (const cinema of cinemas) {
    console.log(cinema)
    await prisma.cinema.upsert({
      where: { cinema_id: cinema.cinema_id },
      update: {},
      create: {
        cinema_id: cinema.cinema_id,
        SNS1: cinema.SNS1,
        SNS2: cinema.SNS2,
        actor: cinema.actor,
        original: cinema.original,
        sales: cinema.sales,
      },
    });
  }

  for (const survived of surviveds) {
    console.log(survived)
    await prisma.survived.upsert({
      where: { PassengerId: survived.PassengerId },
      update: {},
      create: {
        PassengerId: survived.PassengerId,
        Pclass: survived.Pclass,
        Age: survived.Age,
        Parch: survived.Parch,
        Fare: survived.Fare,
        Embarked: survived.Embarked,
        Survived: survived.Survived,
        Sex: survived.Sex,
        SibSp: survived.SibSp,
        Ticket: survived.Ticket,
        Cabin: survived.Cabin,
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
