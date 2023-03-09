import {
  Badge,
  Box,
  createStyles,
  Flex,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useSession } from "next-auth/react";

import { Comments } from "~/components/comment/Comments";
import { ProjectResponse } from "~/utils/schemas/project.schema";

import { SettingsMenu } from "./SettingsMenu";

export function Project({ project }: { project?: ProjectResponse }) {
  const { data: session } = useSession();

  const { classes } = styles();

  if (!project) return null;

  const { title, description, content, tags, user } = project;

  return (
    <Box px={40} p={10} className={classes.main}>
      {user.id === session?.user.id && <SettingsMenu />}

      <Flex direction="column" mt={14}>
        <Box>
          <Title order={1} fw={600}>
            {title}
          </Title>
        </Box>

        <Flex mt={10} gap={10}>
          {tags.map((tag) => (
            <Badge key={tag.id} variant="outline" radius="md">
              # {tag.name}
            </Badge>
          ))}
        </Flex>

        <Box my={12}>
          <Text color="gray.7" fw={300}>
            {description}
          </Text>
        </Box>

        <Box>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </TypographyStylesProvider>
        </Box>
      </Flex>

      <Comments />
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.white,
    position: "relative",
  },
}));
