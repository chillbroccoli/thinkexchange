import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, UseQueryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/utils/constants/keys";
import { APIRoutes } from "~/utils/constants/routes";
import {
  CommentResponse,
  CreateCommentInput,
  UpdateCommentInput,
} from "~/utils/schemas/comment.schema";

import API from "../API";

export const comment = {
  useAll: ({ slug }: { slug: string }, options?: UseQueryOptions<CommentResponse[], Error>) => {
    return useQuery<CommentResponse[], Error>(
      [QUERY_KEYS.COMMENTS, slug],
      async () => {
        const { json } = await API.get([APIRoutes.COMMENTS, { slug }]);

        return json as CommentResponse[];
      },
      options
    );
  },

  useCreate: (
    { slug }: { slug: string },
    options?: MutationOptions<CommentResponse, Error, CreateCommentInput>
  ) => {
    return useMutation(async (body: CreateCommentInput) => {
      const { json } = await API.post([APIRoutes.COMMENTS, { slug }], {
        body,
      });

      return json as CommentResponse;
    }, options);
  },

  useDelete: (
    { slug }: { slug: string },
    options?: MutationOptions<void, Error, { id: number }>
  ) => {
    return useMutation(async ({ id }: { id: number }) => {
      await API.delete([APIRoutes.COMMENT, { slug, id: String(id) }]);
    }, options);
  },

  useUpdate: (
    { slug, id }: { slug: string; id: number },
    options?: MutationOptions<CommentResponse, Error, UpdateCommentInput>
  ) => {
    return useMutation(async (body: UpdateCommentInput) => {
      const { json } = await API.patch([APIRoutes.COMMENT, { slug, id: String(id) }], {
        body,
      });

      return json as CommentResponse;
    }, options);
  },
};
