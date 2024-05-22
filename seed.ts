const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const seedDB = async () => {
  try {
    await db?.collegeList?.deleteMany();

    /**
     * Seeding Data for College Names
     * @type {String[]}
     */

    // creating only one college
    await db?.collegeList?.create({
      data: {
        collegeName: "Eton College",
        house: {
          create: {
            houseName: "house no .1 ",
            foodList: {
              createMany: {
                data: [
                  { foodName: "Burger" },
                  { foodName: "Veg pulaw" },
                  { foodName: "Sandwich" },
                ],
              },
            },
          },
        },
      },
    });

    await db?.collegeList?.create({
      data: {
        collegeName: "Cheltenham College",
        house: {
          create: {
            houseName: "house no .8 ",
            foodList: {
              createMany: {
                data: [
                  { foodName: "Fideuà" },
                  { foodName: "Tortilla" },
                  { foodName: "Fabada" },
                ],
              },
            },
          },
        },
      },
    });

    console.log("Database Succefully Seeded!");
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

seedDB();
