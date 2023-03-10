import { Box, createStyles, Divider, Flex, Text } from "@mantine/core";
import Link from "next/link";

import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { dayjs } from "~/utils/dayjs";
import { ProjectResponse } from "~/utils/schemas/project.schema";

export function MiniList({ title, data }: { title: string; data?: ProjectResponse[] }) {
  const { classes } = styles();

  if (!data) return null;

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
              <Text color="gray.8" fz="lg" fw={300}>
                # {project.title}
              </Text>
              <Text>{dayjs(project.createdAt).format("MMM D, YYYY")}</Text>
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
    borderRadius: theme.radius.sm,
    color: theme.colors.indigo[9],
    backgroundColor: theme.colors.indigo[0],

    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors.indigo[1], 0.85),
    },
  },

  link: {
    textDecoration: "none",
  },
}));
