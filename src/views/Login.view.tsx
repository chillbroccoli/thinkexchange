import { Box, Button, Flex, Title } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { AuthLayout } from "~/components/layouts/AuthLayout";
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
      <Flex direction="column" align="center" mb={15}>
        <Title order={1} fw={500} color="gray.8">
          Welcome back
        </Title>
        <Box mt={20}>
          <Flex align="center" justify="center">
            <Button
              variant="outline"
              leftIcon={<IconBrandGithub size={20} />}
              onClick={githubLogin}
            >
              Log in with Github
            </Button>
          </Flex>
        </Box>
      </Flex>
    </AuthLayout>
  );
}
