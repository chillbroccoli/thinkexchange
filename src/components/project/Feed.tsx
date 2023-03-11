import { Box, Flex } from "@mantine/core";

import { EmptyState } from "~/components/project/EmptyState";
import { ProjectCard } from "~/components/project/ProjectCard";
import { ProjectResponse } from "~/utils/schemas/project.schema";

export function Feed({
  data,
  showEmptyState = true,
}: {
  data?: ProjectResponse[];
  showEmptyState?: boolean;
}) {
  if (showEmptyState && !data?.length) return <EmptyState />;

  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data &&
          data.length > 0 &&
          data.map((project) => <ProjectCard key={project.id} project={project} />)}
      </Flex>
    </Box>
  );
}
