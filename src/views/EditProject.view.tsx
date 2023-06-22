import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { UpdateProjectForm } from "~/components/forms/UpdateProjectForm";
import { MainLayout } from "~/components/layouts/MainLayout";
import { api } from "~/utils/api";
import { ClientRoutes } from "~/utils/constants/routes";

export function EditProjectView() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
    }
  );

  if (data?.user.id !== session?.user.id) {
    router.push(ClientRoutes.HOME);
  }

  const showLoader = !data && !session?.user && isLoading;

  return (
    <MainLayout showLoader={showLoader}>
      <div className="w-[90%] sm:w-auto max-w-6xl pb-5 mx-auto mt-5">
        {data && <UpdateProjectForm data={data} />}
      </div>
    </MainLayout>
  );
}
