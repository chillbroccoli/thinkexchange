import { Box, Button, createStyles, Divider, Drawer, Flex, Popover, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Avatar } from "~/components/Avatar";
import { Logo } from "~/components/Logo";
import { SearchBar } from "~/components/SearchBar";
import { TagList } from "~/components/tag/TagList";
import { profileNav } from "~/utils/constants";
import { ClientRoutes } from "~/utils/constants/routes";

export function MenuDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: session } = useSession();
  const { classes } = styles();
  const smallScreen = useMediaQuery("(min-width: 48em)");

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      position="left"
      withCloseButton={false}
      size={smallScreen ? "60%" : "80%"}
      classNames={{
        body: classes.drawerBody,
      }}
    >
      <Flex direction="column" justify="space-between" h="100%">
        <Box>
          <Box>
            <Logo />
          </Box>
          <Box mt={20} className={classes.tagList} pb={8}>
            <TagList />
          </Box>
        </Box>

        <Box>
          <SearchBar />

          <Popover width={225} position="top-start" shadow="md">
            <Popover.Target>
              <Flex direction="column" px={10} py={14} mt={15} className={classes.profile}>
                <Flex>
                  <Avatar src={session?.user?.image} alt="Avatar" />

                  <Flex direction="column" ml={10}>
                    <Text fw={500} color="gray.8">
                      {session?.user.name}
                    </Text>
                    <Text fz="xs" fw={300} color="gray.6">
                      {session?.user.email}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex direction="column">
                {profileNav.map((item) => (
                  <Link key={item.name} href={item.href} className={classes.link}>
                    {item.name}
                  </Link>
                ))}

                <Divider my="sm" />

                <Button
                  fullWidth
                  onClick={() =>
                    void signOut({
                      redirect: true,
                      callbackUrl: ClientRoutes.HOME,
                    })
                  }
                >
                  Log out
                </Button>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Box>
      </Flex>
    </Drawer>
  );
}

const styles = createStyles((theme) => ({
  drawerBody: {
    height: "100vh",
  },

  tagList: {
    borderTop: `1px solid ${theme.colors.gray[3]}`,
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },

  profile: {
    border: `1px solid ${theme.colors.gray[3]}`,
  },

  link: {
    color: theme.colors.gray[7],
    textDecoration: "none",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,

    "&:hover": {
      textDecoration: "underline",
      color: theme.colors.indigo[9],
      backgroundColor: theme.colors.indigo[1],
    },
  },
}));
