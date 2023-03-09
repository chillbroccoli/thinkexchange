import { GetServerSideProps } from "next";

import { requireAuth } from "~/utils/server/requireAuth";
import { MyBookmarksView } from "~/views/MyBookmarks.view";

export default function MyBookmarksPage() {
  return <MyBookmarksView />;
}

export const getServerSideProps: GetServerSideProps = async (context) => requireAuth(context);
