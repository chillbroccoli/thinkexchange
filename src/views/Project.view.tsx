import { useRouter } from "next/router";

import { AuthorCard } from "~/components/atoms/AuthorCard";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Project } from "~/components/molecules/Project";
import { Stats } from "~/components/molecules/Stats";
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
      <div className="max-w-6xl mx-auto mt-5">
        <div className="hidden md:block">
          {data && (
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-1">
                <Stats />
              </div>
              <div className="col-span-8">
                <Project project={data} />
              </div>
              <div className="col-span-3">
                <AuthorCard project={data} />
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <div className="w-[90%] sm:w-[75%] mx-auto">
            <div>
              <AuthorCard project={data} />
            </div>
            <div className="my-5">
              <Stats />
            </div>
            <div>{data && <Project project={data} />}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
