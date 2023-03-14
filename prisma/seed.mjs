import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

export function getSlug(title) {
  return slugify(title, { lower: true, replacement: "-" }).concat(
    "-",
    (Math.random() + 1).toString(36).substring(2)
  );
}

const prisma = new PrismaClient();

export const tagList = [
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "remix",
  "vue",
  "angular",
  "svelte",
  "solid",
  "ember",
  "node",
  "deno",
  "bun",
  "graphql",
  "frontend",
  "backend",
  "fullstack",
  "docker",
  "kubernetes",
  "aws",
  "c",
  "c++",
  "c#",
  "python",
  "java",
  "go",
  "rust",
  "php",
  "ruby",
  "scala",
  "elixir",
  "clojure",
  "haskell",
  "erlang",
  "html",
  "css",
  "sass",
  "less",
  "stylus",
  "tailwind",
  "bootstrap",
  "bulma",
  "material-ui",
  "chakra-ui",
  "ant-design",
  "react-native",
  "flutter",
  "ionic",
  "android",
  "ios",
  "windows",
  "linux",
  "macos",
  "git",
  "bash",
  "zsh",
  "powershell",
  "expo",
  "laravel",
  "rails",
  "spring",
  "express",
  "fastify",
  "nest",
  "adonis",
  "sails",
  "koa",
  "django",
  "flask",
  "phoenix",
];

export const seed = async () => {
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const createTags = tagList.map((tag) =>
    prisma.tag.create({
      data: {
        name: tag,
      },
    })
  );

  const tags = await prisma.$transaction(createTags);

  const userData = Array(10)
    .fill(null)
    .map(() => ({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
    }));

  const createUsers = userData.map((user) =>
    prisma.user.create({
      data: user,
    })
  );

  const users = await prisma.$transaction(createUsers);

  const projects = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      projects.push({
        createdAt: faker.date.past(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(8),
        content: faker.lorem.paragraphs(5),
        slug: getSlug(faker.lorem.slug()),
        user: {
          connect: {
            id: users[i].id,
          },
        },
        // Connect 3 random tags to each project
        tags: {
          connect: [
            {
              id: tags[Math.floor(Math.random() * tags.length)].id,
            },
            {
              id: tags[Math.floor(Math.random() * tags.length)].id,
            },
            {
              id: tags[Math.floor(Math.random() * tags.length)].id,
            },
          ],
        },
      });
    }
  }

  const createProjects = projects.map((project) =>
    prisma.project.create({
      data: project,
    })
  );

  await prisma.$transaction(createProjects);
};

seed()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log("Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
