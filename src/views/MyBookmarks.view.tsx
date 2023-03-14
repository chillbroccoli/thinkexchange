import { Box, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { BookmarksNotFound } from "~/components/BookmarksNotFound";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Feed } from "~/components/project/Feed";
import { api } from "~/utils/api";

export function MyBookmarksView() {
  const smallScreen = useMediaQuery("(min-width: 48em)");
  const { data, isLoading } = api.project.useUserBookmarks();

  return (
    <MainLayout showLoader={isLoading}>
      <Container size="lg" mt={20}>
        <Box w={smallScreen ? "70%" : "90%"} mx="auto">
          <Box mt={20}>
            <Feed data={data} showEmptyState={false} />
            {!data?.length && <BookmarksNotFound />}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
