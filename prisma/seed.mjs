import { PrismaClient } from "@prisma/client";

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

  const createTags = tagList.map((tag) =>
    prisma.tag.create({
      data: {
        name: tag,
      },
    })
  );

  await prisma.$transaction(createTags);
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
