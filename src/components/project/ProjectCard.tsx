import { Badge, Box, createStyles, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";

import { Avatar } from "~/components/Avatar";
import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { trimLongText } from "~/utils/helpers/trimLongText";
import { ProjectResponse } from "~/utils/schemas/project.schema";

export function ProjectCard({ project }: { project: ProjectResponse }) {
  const { classes } = styles();

  const { slug, title, description, tags, createdAt, user } = project;

  return (
    <Link
      href={Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug }])}
      className={classes.cardLink}
    >
      <Box px={20} py={10}>
        <Flex align="center">
          <Avatar mr={6} size="lg" src={user.image} color="indigo" alt="Avatar" />

          <Flex direction="column">
            <Text transform="capitalize" fw={500} color="gray.8">
              {user.name}
            </Text>
            <Text fz="xs" fw={300} color="gray.6">
              {dayjs(createdAt).format("MMM DD, YYYY")}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" mt={14}>
          <Box>
            <Link
              href={Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug }])}
              className={classes.link}
            >
              <Title order={3} fw={600}>
                {title}
              </Title>
            </Link>
          </Box>

          <Box my={8}>
            <Text fz="sm" color="gray.7" fw={300}>
              {trimLongText(description)}
            </Text>
          </Box>

          <Flex mt={8} gap={10} wrap="wrap">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="outline" size="lg" radius="md">
                # {tag.name}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}

const styles = createStyles((theme) => ({
  cardLink: {
    textDecoration: "none",
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.white,

    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors.indigo[1], 0.45),
      transition: "all 0.25s ease-in-out",
    },
  },

  link: {
    color: theme.colors.gray[7],
    textDecoration: "none",

    "&:hover": {
      color: theme.colors.indigo[5],
      transition: "color 0.2s ease-in-out",
      textDecoration: "underline",
    },
  },
}));
