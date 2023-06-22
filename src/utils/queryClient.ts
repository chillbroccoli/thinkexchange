import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { toast } from "./helpers/toast";

export const queryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof Error) {
      return toast({
        title: "Error",
        description: error.message,
        type: "error",
      });
    }

    return toast({
      title: "Error",
      description: "Something went wrong",
      type: "error",
    });
  },
});

export const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    if (error instanceof Error) {
      return toast({
        title: "Error",
        description: error.message,
        type: "error",
      });
    }

    return toast({
      title: "Error",
      description: "Something went wrong",
      type: "error",
    });
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
