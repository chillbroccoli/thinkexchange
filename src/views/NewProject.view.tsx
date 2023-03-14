import { Box, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { NewProjectForm } from "~/components/forms/NewProjectForm";
import { MainLayout } from "~/components/layouts/MainLayout";

export function NewProjectView() {
  const smallScreen = useMediaQuery("(min-width: 48em)");

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w={smallScreen ? "75%" : "90%"}>
          <NewProjectForm />
        </Box>
      </Container>
    </MainLayout>
  );
}
