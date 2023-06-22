import { useRouter } from "next/router";
import { useEffect } from "react";

import { Feed } from "~/components/atoms/Feed";
import { MiniList } from "~/components/atoms/MiniList";
import { NotFoundState } from "~/components/atoms/NotFoundState";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";
import { useScrollPosition } from "~/utils/hooks/useScrollPosition";

export function SearchView() {
  const router = useRouter();

  const { q } = router.query as { q: string };

  const scrollPosition = useScrollPosition();

  const {
    data,
    isLoading: isFeedLoading,
    hasNextPage,
    isFetching,
    fetchNextPage,
    refetch,
  } = api.project.useFeed(
    {
      limit: 5,
      query: q,
    },
    {
      enabled: q !== undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: latestProjects, isLoading: isLatestLoading } = api.project.useLatestProjects();

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (q) {
      refetch();
    }
  }, [q, refetch]);

  return (
    <MainLayout showLoader={isFeedLoading || isLatestLoading}>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-8">
              <p className="mb-5 text-xl font-medium text-gray-800">
                Search results for: {router.query?.q}
              </p>

              <Feed data={projects} />
              {!hasNextPage && projects.length > 0 && <NotFoundState />}
            </div>
            <div className="col-span-4">
              <MiniList title="Latest" data={latestProjects} />
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="w-[90%] sm:w-[75%] mx-auto">
            <p className="mb-5 text-xl font-medium text-gray-800">
              Search results for: {router.query?.q}
            </p>

            <div className="my-5">
              <Feed data={projects} />
              {!hasNextPage && projects.length > 0 && <NotFoundState />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
