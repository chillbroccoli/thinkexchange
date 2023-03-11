import { Container, Grid } from "@mantine/core";
import { useRouter } from "next/router";

import { AuthorCard } from "~/components/author/AuthorCard";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Project } from "~/components/project/Project";
import { Stats } from "~/components/project/Stats";
import { api } from "~/utils/api";

export function ProjectView() {
  const router = useRouter();

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
      </Container>
    </MainLayout>
  );
}
