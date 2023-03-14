import { ActionIcon, Box, Button, Container, createStyles, Flex, MediaQuery } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Logo } from "~/components/Logo";
import { Profile } from "~/components/Profile";
import { SearchBar } from "~/components/SearchBar";
import { ClientRoutes } from "~/utils/constants/routes";

import { MenuDrawer } from "./MenuDrawer";

export function Navbar() {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const minMediumScreen = useMediaQuery("(min-width: 64em)");
  const maxMediumScreen = useMediaQuery("(max-width: 64em)");
  const { classes } = styles();

  return (
    <>
      <Box px={20} py={12} className={classes.navbar}>
        <Container size="lg">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={14}>
              {/* Dunno why media query is not working for search bar */}
              <Logo />
              {minMediumScreen && <SearchBar />}
            </Flex>

            {maxMediumScreen && (
              <ActionIcon onClick={open}>
                <IconMenu2 size={20} />
              </ActionIcon>
            )}

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
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
            </MediaQuery>
          </Flex>
        </Container>
      </Box>

      <MenuDrawer isOpen={opened} onClose={close} />
    </>
  );
}

const styles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.lg,
  },
}));
