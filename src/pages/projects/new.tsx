import { GetServerSideProps } from "next";

import { requireAuth } from "~/utils/server/requireAuth";
import { NewProjectView } from "~/views/NewProject.view";

export default function NewProject() {
  return <NewProjectView />;
}

export const getServerSideProps: GetServerSideProps = async (context) => requireAuth(context);
