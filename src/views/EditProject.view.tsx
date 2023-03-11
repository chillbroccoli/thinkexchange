import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { UpdateProjectForm } from "~/components/forms/UpdateProjectForm";
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

  if (data?.user.id !== session?.user.id) {
    router.push(ClientRoutes.HOME);
  }

  const showLoader = !data && !session?.user && isLoading;

  return (
    <MainLayout showLoader={showLoader}>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w="75%">
          {data && <UpdateProjectForm data={data} />}
        </Box>
      </Container>
    </MainLayout>
  );
}
