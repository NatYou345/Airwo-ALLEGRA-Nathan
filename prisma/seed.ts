import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "";

if (!adminPassword || adminPassword.length < 12) {
  throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters");
}

const userData: Prisma.UserCreateInput[] = Array.from({ length: 100 }).map(
  () => ({
    name: faker.internet.username(),
    email: faker.internet.email(),
    password: hashSync(faker.internet.password({ length: 16 }), 12),
    avatar: faker.image.avatar(),
  })
);

const cityData: Prisma.CityCreateInput[] = Array.from({ length: 100 }).map(
  () => ({
    name: faker.location.city(),
  })
);

const placeData: Prisma.PlaceCreateInput[] = Array.from({ length: 100 }).map(
  () => ({
    name: `${faker.company.catchPhraseAdjective()} ${faker.company.catchPhraseNoun()}`,
    description: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({ category: "city" }),
    numberOfRooms: faker.number.int({
      min: 1,
      max: 10,
    }),
    numberOfBathrooms: faker.number.int({
      min: 1,
      max: 3,
    }),
    maxGuests: faker.number.int({
      min: 1,
      max: 10,
    }),
    priceByNight: faker.number.int({
      min: 100,
      max: 1000,
    }),
    host: {
      connect: {
        id: faker.number.int({
          min: 1,
          max: 100,
        }),
      },
    },
    city: {
      connect: {
        id: faker.number.int({
          min: 1,
          max: 100,
        }),
      },
    },
  })
);

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const c of cityData) {
    const city = await prisma.city.create({
      data: c,
    });
    console.log(`Created city with id: ${city.id}`);
  }
  for (const p of placeData) {
    const place = await prisma.place.create({
      data: p,
    });
    console.log(`Created place with id: ${place.id}`);
  }
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashSync(adminPassword, 12),
    },
  });
  console.log(`Seeding finished.`);
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
