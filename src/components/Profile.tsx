import { Button, createStyles, Divider, Flex, Popover, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Avatar } from "~/components/Avatar";
import { profileNav } from "~/utils/constants";
import { ClientRoutes } from "~/utils/constants/routes";

export function Profile() {
  const { data: session } = useSession();

  const { classes } = styles();

  if (!session) return null;

  return (
    <Flex>
      <Popover width={225} position="bottom-end" shadow="md">
        <Popover.Target>
          <UnstyledButton>
            <Avatar src={session.user?.image} />
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex direction="column">
            <Flex direction="column">
              <Text transform="capitalize" fw={500} color="gray.8">
                {session.user?.name}
              </Text>
              <Text fz="xs" fw={300} color="gray.6">
                {session.user?.email}
              </Text>
            </Flex>

            <Divider my="sm" />

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
    </Flex>
  );
}

const styles = createStyles((theme) => ({
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
