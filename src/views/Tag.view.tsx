import { Button, Container, createStyles, Divider, Flex, Grid, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { MainLayout } from "~/components/layouts/MainLayout";
import { Feed } from "~/components/project/Feed";
import { MiniList } from "~/components/project/MiniList";
import { api } from "~/utils/api";
import { ClientRoutes } from "~/utils/constants/routes";
import { pluralizeCount } from "~/utils/helpers/pluralizeCount";
import { useScrollPosition } from "~/utils/hooks/useScrollPosition";

export function TagView() {
  const { data: session } = useSession();
  const { classes } = styles();

  const router = useRouter();

  const { tag } = router.query as { tag: string };

  const scrollPosition = useScrollPosition();

  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } = api.project.useFeed(
    {
      limit: 5,
      tag,
    },
    {
      enabled: tag !== undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: latestProjects, isLoading: isLatestProjectsLoading } =
    api.project.useLatestProjects();

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Flex direction="column" className={classes.sidebar} p={10} px={14}>
              <Title order={2} transform="capitalize" mb={8}>
                {router.query?.tag}
              </Title>
              {session?.user && (
                <Button
                  component={Link}
                  href={ClientRoutes.NEW_PROJECT}
                  leftIcon={<IconPlus size={20} />}
                >
                  New Project
                </Button>
              )}

              <Divider my="sm" />

              <Text>{pluralizeCount(projects.length ?? 0, "post")} found</Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Feed data={projects} isLoading={isLoading} />
          </Grid.Col>
          <Grid.Col span={3}>
            <MiniList title="Latest" data={latestProjects} isLoading={isLatestProjectsLoading} />
          </Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}

const styles = createStyles((theme) => ({
  sidebar: {
    boxShadow: theme.shadows.lg,
    border: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
  },
}));
