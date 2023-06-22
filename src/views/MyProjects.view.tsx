import { Feed } from "~/components/atoms/Feed";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";

export function MyProjectsView() {
  const { data, isLoading } = api.project.useUserProjects();

  return (
    <MainLayout showLoader={isLoading}>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="w-[90%] sm:w-[75%] mx-auto">
          <div className="mt-5">
            <Feed data={data} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
