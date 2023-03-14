import { Box, Container, Flex, Grid, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";

import { MainLayout } from "~/components/layouts/MainLayout";
import { Feed } from "~/components/project/Feed";
import { MiniList } from "~/components/project/MiniList";
import { NotFoundState } from "~/components/project/NotFoundState";
import { Tags } from "~/components/tag/Tags";
import { api } from "~/utils/api";
import { useScrollPosition } from "~/utils/hooks/useScrollPosition";

export function HomeView() {
  const scrollPosition = useScrollPosition();
  const smallScreen = useMediaQuery("(min-width: 48em)");

  const {
    data,
    isLoading: isFeedLoading,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = api.project.useFeed(
    {
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: frontendData, isLoading: isFrontendLoading } = api.project.useTagProjects({
    tag: "frontend",
  });

  const { data: backendData, isLoading: isBackendLoading } = api.project.useTagProjects({
    tag: "backend",
  });

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition]);

  const isLoading = isFeedLoading || isFrontendLoading || isBackendLoading;

  return (
    <MainLayout showLoader={isLoading}>
      <Container size="lg" mt={20}>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid gutter={10}>
            <Grid.Col span={3}>
              <Tags />
            </Grid.Col>
            <Grid.Col span={6}>
              <Feed data={projects} />
              {!hasNextPage && projects.length > 0 && <NotFoundState />}
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex direction="column" gap={20}>
                <MiniList title="frontend" data={frontendData} />
                <MiniList title="backend" data={backendData} />
              </Flex>
            </Grid.Col>
          </Grid>
        </MediaQuery>

        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Box w={smallScreen ? "70%" : "90%"} mx="auto">
            <Feed data={projects} />
            {!hasNextPage && projects.length > 0 && <NotFoundState />}
          </Box>
        </MediaQuery>
      </Container>
    </MainLayout>
  );
}
