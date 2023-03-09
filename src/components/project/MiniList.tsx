import { Box, createStyles, Divider, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconBookmark, IconHeart, IconMessage2 } from "@tabler/icons-react";
import Link from "next/link";

import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Spinner } from "../Spinner";

export function MiniList({
  title,
  data,
  isLoading,
}: {
  title: string;
  data?: ProjectResponse[];
  isLoading: boolean;
}) {
  const { classes } = styles();
  const theme = useMantineTheme();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box p={10} px={14} className={classes.main}>
      <Text fz="lg" fw={500}>
        # {title}
      </Text>
      <Divider my="sm" />
      <Flex direction="column" gap={8}>
        {data?.map((project) => (
          <Link
            href={Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug: project.slug }])}
            key={project.id}
            className={classes.link}
          >
            <Flex direction="column" p={4} px={8} className={classes.item}>
              <Text color="gray.8"># {project.title}</Text>
              <Flex gap={10} mt={6}>
                <Flex>
                  <IconHeart size={18} color={theme.colors.red[5]} />
                  <Text ml={4} color="gray.8">
                    {project._count.likes}
                  </Text>
                </Flex>
                <Flex>
                  <IconBookmark size={18} color={theme.colors.gray[8]} />
                  <Text ml={4} color="gray.8">
                    {project._count.bookmarks}
                  </Text>
                </Flex>
                <Flex>
                  <IconMessage2 size={18} color={theme.colors.blue[5]} />
                  <Text ml={4} color="gray.8">
                    {project._count.comments}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.lg,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
  },

  item: {
    border: `1px solid ${theme.colors.indigo[2]}`,
    borderRadius: theme.radius.sm,
    color: theme.colors.indigo[9],

    "&:hover": {
      backgroundColor: theme.colors.indigo[1],
    },
  },

  link: {
    textDecoration: "none",
  },
}));
