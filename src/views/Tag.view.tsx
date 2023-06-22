import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Feed } from "~/components/atoms/Feed";
import { MiniList } from "~/components/atoms/MiniList";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Divider } from "~/components/ui/Divider";
import { LinkButton } from "~/components/ui/LinkButton";
import { api } from "~/utils/api";
import { ClientRoutes } from "~/utils/constants/routes";
import { pluralizeCount } from "~/utils/helpers/pluralizeCount";
import { useScrollPosition } from "~/utils/hooks/useScrollPosition";

export function TagView() {
  const { data: session } = useSession();

  const router = useRouter();

  const { tag } = router.query as { tag: string };

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
      tag,
    },
    {
      enabled: tag !== undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: latestProjects, isLoading: isLatestLoading } = api.project.useLatestProjects();

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (tag) {
      refetch();
    }
  }, [tag, refetch]);

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  const isLoading = isFeedLoading || isLatestLoading;

  return (
    <MainLayout showLoader={isLoading}>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3">
              <div className="flex flex-col p-3 px-4 bg-white border-2 border-black">
                <h2 className="mb-2 text-2xl capitalize">{router.query?.tag}</h2>
                {session?.user && (
                  <LinkButton href={ClientRoutes.NEW_PROJECT}>
                    <IconPlus className="mr-1" size={20} />
                    New Project
                  </LinkButton>
                )}

                <Divider className="my-3" />

                <p>{pluralizeCount(projects.length ?? 0, "post")} found</p>
              </div>
            </div>
            <div className="col-span-6">
              <Feed data={projects} />
            </div>
            <div className="col-span-3">
              <MiniList title="Latest" data={latestProjects} />
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="w-[90%] sm:w-[75%] mx-auto">
            <div className="flex flex-col p-3 px-4 bg-white border-2 border-black">
              <h2 className="mb-2 text-2xl capitalize">{router.query?.tag}</h2>
              {session?.user && (
                <LinkButton href={ClientRoutes.NEW_PROJECT}>
                  <IconPlus className="mr-1" size={20} />
                  New Project
                </LinkButton>
              )}

              <Divider className="my-3" />

              <p>{pluralizeCount(projects.length ?? 0, "post")} found</p>
            </div>

            <div className="my-5">
              <Feed data={projects} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
