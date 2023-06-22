import { IconBrandGithub } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { AuthLayout } from "~/components/layouts/AuthLayout";
import { Button } from "~/components/ui/Button";
import { ClientRoutes } from "~/utils/constants/routes";

export function LoginView() {
  const router = useRouter();

  const { redirect } = router.query as { redirect?: string };

  const githubLogin = () => {
    void signIn("github", {
      redirect: true,
      callbackUrl: redirect ? redirect : ClientRoutes.HOME,
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-3">
        <h1 className="font-medium gray-800">Welcome back</h1>
        <div className="mt-4">
          <div className="flex items-center justify-center">
            <Button className="flex items-center space-x-1" onClick={githubLogin}>
              <IconBrandGithub />
              <span>Log in with Github</span>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
