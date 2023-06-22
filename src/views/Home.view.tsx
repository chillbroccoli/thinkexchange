import { useEffect } from "react";

import { Feed } from "~/components/atoms/Feed";
import { MiniList } from "~/components/atoms/MiniList";
import { NotFoundState } from "~/components/atoms/NotFoundState";
import { Tags } from "~/components/atoms/Tags";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";
import { useScrollPosition } from "~/utils/hooks/useScrollPosition";

export function HomeView() {
  const scrollPosition = useScrollPosition();

  const {
    data,
    isLoading: isFeedLoading,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = api.project.useFeed(
    {
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: frontendData, isLoading: isFrontendLoading } = api.project.useTagProjects({
    tag: "frontend",
  });

  const { data: backendData, isLoading: isBackendLoading } = api.project.useTagProjects({
    tag: "backend",
  });

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition]);

  const isLoading = isFeedLoading || isFrontendLoading || isBackendLoading;

  return (
    <MainLayout showLoader={isLoading}>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <Tags />
            </div>
            <div className="col-span-6">
              <Feed data={projects} />
              {!hasNextPage && projects.length > 0 && <NotFoundState />}
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-5">
                <MiniList title="frontend" data={frontendData} />
                <MiniList title="backend" data={backendData} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="mx-auto w-[90%] sm:w-[75%]">
            <Feed data={projects} />
            {!hasNextPage && projects.length > 0 && <NotFoundState />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
