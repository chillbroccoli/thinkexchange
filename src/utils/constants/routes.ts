export enum APIRoutes {
  TAGS = "/api/tags",
  USERS = "/api/users",
  LOGIN = "/api/users/login",
  LOGOUT = "/api/users/logout",
  DETAILS = "/api/users/details",
  PROJECTS = "/api/projects",
  LATEST_PROJECTS = "/api/projects/latest",
  PROJECT = "/api/projects/:slug",
  TAG_PROJECTS = "/api/projects/tag/:tag",
  FEED = "/api/projects/feed",
  COMMENTS = "/api/projects/:slug/comments",
  COMMENT = "/api/projects/:slug/comments/:id",
  PROJECT_STATS = "/api/projects/:slug/stats",
  LIKE_PROJECT = "/api/projects/:slug/like",
  BOOKMARK_PROJECT = "/api/projects/:slug/bookmark",
  USER_PROJECTS = "/api/my-projects",
  USER_BOOKMARKS = "/api/my-bookmarks",
}

export enum ClientRoutes {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  SETTINGS = "/settings",
  TAGS = "/tags",
  TAG = "/tags/:tag",
  PROJECT = "/projects/:slug",
  EDIT_PROJECT = "/projects/:slug/edit",
  NEW_PROJECT = "/projects/new",
  MY_PROJECTS = "/my-projects",
  MY_BOOKMARKS = "/my-bookmarks",
  SEARCH = "/search",
}

export const PROTECTED_ROUTES = [ClientRoutes.SETTINGS];
