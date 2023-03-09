import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";

import { UpdateProjectForm } from "~/components/forms/UpdateProjectForm";
import { LoaderLayout } from "~/components/layouts/LoaderLayout";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";

export function EditProjectView() {
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
    }
  );

  if (isLoading) return <LoaderLayout />;

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w="75%">
          {data && <UpdateProjectForm data={data} />}
        </Box>
      </Container>
    </MainLayout>
  );
}
