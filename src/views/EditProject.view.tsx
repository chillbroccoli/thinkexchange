import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { UpdateProjectForm } from "~/components/forms/UpdateProjectForm";
import { LoaderLayout } from "~/components/layouts/LoaderLayout";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";
import { ClientRoutes } from "~/utils/constants/routes";

export function EditProjectView() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
    }
  );

  if (!data && !session?.user && isLoading) return <LoaderLayout />;

  if (data?.user.id !== session?.user.id) {
    router.push(ClientRoutes.HOME);
  }

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
