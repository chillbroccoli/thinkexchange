import { Box, Container, Grid, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

import { AuthorCard } from "~/components/author/AuthorCard";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Project } from "~/components/project/Project";
import { Stats } from "~/components/project/Stats";
import { api } from "~/utils/api";

export function ProjectView() {
  const router = useRouter();
  const smallScreen = useMediaQuery("(min-width: 48em)");

  const { slug } = router.query as { slug: string };

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <MainLayout showLoader={isLoading}>
      <Container size="lg" mt={20} pb={20}>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          {data && (
            <Grid gutter={10}>
              <Grid.Col span={1}>
                <Stats />
              </Grid.Col>
              <Grid.Col span={8}>
                <Project project={data} />
              </Grid.Col>
              <Grid.Col span={3}>
                <AuthorCard project={data} />
              </Grid.Col>
            </Grid>
          )}
        </MediaQuery>

        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Box w={smallScreen ? "70%" : "90%"} mx="auto">
            <Box>
              <AuthorCard project={data} />
            </Box>
            <Box my={15}>
              <Stats position="horizontal" />
            </Box>
            <Box>{data && <Project project={data} />}</Box>
          </Box>
        </MediaQuery>
      </Container>
    </MainLayout>
  );
}
