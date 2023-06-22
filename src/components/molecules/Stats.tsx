import {
  IconBookmark,
  IconBookmarkOff,
  IconHeart,
  IconHeartFilled,
  IconMessage2,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { cn } from "~/utils/helpers/cn";
import { queryClient } from "~/utils/queryClient";

export function Stats() {
  const { data: session } = useSession();

  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data } = api.project.useProjectStats(
    { slug },
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: like } = api.project.useLike({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
    },
  });

  const { mutate: bookmark } = api.project.useBookmark({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
    },
  });

  const isLiked = data?.likes?.find((like) => like.userId === session?.user.id);
  const isBookmarked = data?.bookmarks?.find((bookmark) => bookmark.userId === session?.user.id);

  return (
    <div
      className={cn(
        "flex flex-row md:flex-col p-2 gap-8 md:gap-4 bg-white border-2 border-black justify-center"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        {isLiked ? (
          <button
            className="flex items-center justify-center text-red-500"
            onClick={() => like({ slug })}
          >
            <IconHeartFilled size={26} />
          </button>
        ) : (
          <button className="flex items-center justify-center" onClick={() => like({ slug })}>
            <IconHeart size={26} />
          </button>
        )}

        <p className="text-sm font-semibold text-gray-800">{data?._count?.likes ?? 0}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="flex items-center justify-center">
          <IconMessage2 size={26} />
        </button>
        <p className="text-sm font-semibold text-gray-800">{data?._count?.comments ?? 0}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {isBookmarked ? (
          <button
            className="flex items-center justify-center text-indigo-500"
            onClick={() => bookmark({ slug })}
          >
            <IconBookmarkOff size={26} />
          </button>
        ) : (
          <button className="flex items-center justify-center" onClick={() => bookmark({ slug })}>
            <IconBookmark size={26} />
          </button>
        )}
        <p className="text-sm font-semibold text-gray-800">{data?._count?.bookmarks ?? 0}</p>
      </div>
    </div>
  );
}
