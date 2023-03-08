import { createStyles, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";

import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Avatar } from "../Avatar";

export function AuthorCard({ project }: { project?: ProjectResponse }) {
  const { classes } = styles();

  if (!project) return null;

  const { user, createdAt } = project;

  return (
    <Flex direction="column" px={10} py={14} className={classes.main}>
      <Flex>
        <Avatar src={user?.image} alt={user.name} />

        <Flex direction="column" ml={10}>
          <Text fw={500} color="gray.8">
            {user.name}
          </Text>
          <Text fz="xs" fw={300} color="gray.6">
            {dayjs(createdAt).format("MMM D, YYYY")}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.xs,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
  },
}));
