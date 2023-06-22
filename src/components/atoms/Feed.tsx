import { EmptyState } from "~/components/atoms/EmptyState";
import { ProjectCard } from "~/components/molecules/ProjectCard";
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
    <div>
      <div className="flex flex-col gap-5">
        {data &&
          data.length > 0 &&
          data.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}
