import { Box, createStyles, Flex, Image } from "@mantine/core";
import Link from "next/link";

import { ClientRoutes } from "~/utils/constants/routes";

export function Logo() {
  const { classes } = styles();

  return (
    <Box>
      <Link href={ClientRoutes.HOME}>
        <Flex
          align="center"
          justify="center"
          bg="indigo"
          w={120}
          h={38}
          p={5}
          className={classes.logo}
        >
          <Image src="/logo-no-background.png" alt="Logo" w="100%" h="100%" />
        </Flex>
      </Link>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  logo: {
    borderRadius: theme.radius.sm,
  },
}));
