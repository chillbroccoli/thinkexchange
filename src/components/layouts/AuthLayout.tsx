import { ActionIcon, Box, createStyles, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const maxMediumScreen = useMediaQuery("(max-width: 64em)");
  const { classes } = styles();

  return (
    <Box w="100vw" h="100vh">
      <ActionIcon onClick={() => router.back()} className={classes.backButton}>
        <IconArrowLeft size={20} />
      </ActionIcon>
      <Flex align="center" justify="center" w="100%" h="100%">
        <Box w={maxMediumScreen ? "85%" : 400} p={14} className={classes.main}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    border: `1px solid ${theme.colors.gray[2]}`,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.white,
  },

  backButton: {
    border: `1px solid ${theme.colors.indigo[5]}`,
    color: theme.colors.indigo[5],
    position: "absolute",
    top: 20,
    left: 20,
  },
}));
