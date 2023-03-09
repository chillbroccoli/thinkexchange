import { Box, Button, Container, createStyles, Flex } from "@mantine/core";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Logo } from "~/components/Logo";
import { Profile } from "~/components/Profile";
import { SearchBar } from "~/components/SearchBar";
import { ClientRoutes } from "~/utils/constants/routes";

export function Navbar() {
  const { data: session } = useSession();

  const { classes } = styles();

  return (
    <Box px={20} py={12} className={classes.navbar}>
      <Container size="lg">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={14}>
            <Logo />
            <SearchBar />
          </Flex>

          <Flex gap={14}>
            {session?.user ? (
              <Profile />
            ) : (
              <>
                <Button variant="outline" component={Link} href={ClientRoutes.LOGIN}>
                  Log in
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.lg,
  },
}));
