import { Tag } from "@prisma/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { APIRoutes } from "~/utils/constants/routes";

import API from "../API";

export const tag = {
  useAll: (options?: UseQueryOptions<Tag[], Error>) => {
    return useQuery<Tag[], Error>(
      [APIRoutes.TAGS],
      async () => {
        const { json } = await API.get(APIRoutes.TAGS);

        return json as Tag[];
      },
      options
    );
  },
};
