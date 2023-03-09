import {
  MutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "~/utils/constants/keys";
import { APIRoutes } from "~/utils/constants/routes";
import { BookmarkResponse } from "~/utils/schemas/bookmark.schema";
import { LikeResponse } from "~/utils/schemas/like.schema";
import {
  CreateProjectInput,
  ProjectResponse,
  ProjectsFeedResponse,
  ProjectStatsResponse,
} from "~/utils/schemas/project.schema";

import API from "../API";

export const project = {
  useFeed: (
    query?: { limit?: number; cursor?: number; tag?: string; query?: string },
    options?: UseInfiniteQueryOptions<ProjectsFeedResponse, Error>
  ) => {
    return useInfiniteQuery<ProjectsFeedResponse, Error>(
      [QUERY_KEYS.FEED],
      async ({ pageParam }) => {
        const { json } = await API.get(APIRoutes.FEED, {
          query: {
            ...query,
            cursor: pageParam,
          },
        });

        return json as ProjectsFeedResponse;
      },
      {
        ...options,
      }
    );
  },

  useOne: ({ slug }: { slug: string }, options?: UseQueryOptions<ProjectResponse, Error>) => {
    return useQuery<ProjectResponse, Error>(
      [QUERY_KEYS.PROJECT, slug],
      async () => {
        const { json } = await API.get([APIRoutes.PROJECT, { slug }]);

        return json as ProjectResponse;
      },
      options
    );
  },

  useCreate: (options?: MutationOptions<ProjectResponse, Error, CreateProjectInput>) => {
    return useMutation(async (body: CreateProjectInput) => {
      const { json } = await API.post(APIRoutes.PROJECTS, {
        body,
      });

      return json as ProjectResponse;
    }, options);
  },

  useUpdate: (
    { slug }: { slug: string },
    options?: MutationOptions<ProjectResponse, Error, CreateProjectInput>
  ) => {
    return useMutation(async (body: CreateProjectInput) => {
      const { json } = await API.patch([APIRoutes.PROJECT, { slug }], {
        body,
      });

      return json as ProjectResponse;
    }, options);
  },

  useDelete: (options?: MutationOptions<void, Error, { slug: string }>) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      await API.delete([APIRoutes.PROJECT, { slug }]);
    }, options);
  },

  useProjectStats: (
    { slug }: { slug: string },
    options?: UseQueryOptions<ProjectStatsResponse, Error>
  ) => {
    return useQuery<ProjectStatsResponse, Error>(
      [QUERY_KEYS.PROJECT_STATS, slug],
      async () => {
        const { json } = await API.get([APIRoutes.PROJECT_STATS, { slug }]);

        return json as ProjectStatsResponse;
      },
      options
    );
  },

  useLike: (options?: MutationOptions<LikeResponse, Error, { slug: string }>) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      const { json } = await API.post([APIRoutes.LIKE_PROJECT, { slug }]);

      return json as LikeResponse;
    }, options);
  },

  useBookmark: (options?: MutationOptions<BookmarkResponse, Error, { slug: string }>) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      const { json } = await API.post([APIRoutes.BOOKMARK_PROJECT, { slug }]);

      return json as BookmarkResponse;
    }, options);
  },
};
