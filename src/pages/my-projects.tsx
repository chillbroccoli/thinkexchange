import { GetServerSideProps } from "next";

import { requireAuth } from "~/utils/server/requireAuth";
import { MyProjectsView } from "~/views/MyProjects.view";

export default function MyProjectsPage() {
  return <MyProjectsView />;
}

export const getServerSideProps: GetServerSideProps = async (context) => requireAuth(context);
