import { Box, Flex } from "@mantine/core";

import { EmptyState } from "~/components/project/EmptyState";
import { ProjectCard } from "~/components/project/ProjectCard";
import { Spinner } from "~/components/Spinner";
import { ProjectResponse } from "~/utils/schemas/project.schema";

export function Feed({
  data,
  isLoading,
  showEmptyState = true,
}: {
  data?: ProjectResponse[];
  isLoading?: boolean;
  showEmptyState?: boolean;
}) {
  if (isLoading && !data?.length) return <Spinner />;
  if (showEmptyState && !isLoading && !data?.length) return <EmptyState />;

  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data &&
          data.length > 0 &&
          data.map((project) => (
            <ProjectCard key={`${project.id}-${project.slug}`} project={project} />
          ))}
      </Flex>
    </Box>
  );
}
