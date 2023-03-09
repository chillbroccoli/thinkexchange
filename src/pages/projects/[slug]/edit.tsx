import { GetServerSideProps } from "next";

import { requireAuth } from "~/utils/server/requireAuth";
import { EditProjectView } from "~/views/EditProject.view";

export default function EditProjectPage() {
  return <EditProjectView />;
}

export const getServerSideProps: GetServerSideProps = async (context) => requireAuth(context);
