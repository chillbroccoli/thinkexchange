import { showNotification } from "@mantine/notifications";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof Error) {
      return showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }

    return showNotification({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
  },
});

export const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    if (error instanceof Error) {
      return showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }

    return showNotification({
      title: "Error",
      message: "Something went wrong",
      color: "red",
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
