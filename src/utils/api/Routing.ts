import { RouteParameters } from "express-serve-static-core";

import { APIRoutes, ClientRoutes } from "~/utils/constants/routes";

export type RouteWithParams<T extends string> =
  keyof RouteParameters<T> extends never ? T : [T, RouteParameters<T>];

export const Routing = {
  getInterpolatedRoute<T extends ClientRoutes | APIRoutes>(
    route: RouteWithParams<T>
  ) {
    const [path, params] = parseRouteWithParams(route);
    return params
      ? Object.entries(params).reduce(
          (path, [key, value]) => path.replace(`:${key}`, value),
          path as string
        )
      : path;
  },
};

function parseRouteWithParams<T extends string>(
  route: RouteWithParams<T>
): [T, RouteParameters<T>?] {
  return Array.isArray(route) ? route : [route as T];
}
