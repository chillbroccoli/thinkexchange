import { createStyles, Flex, Loader } from "@mantine/core";

export function LoaderLayout() {
  const { classes } = styles();

  return (
    <Flex w="100%" h="100%" align="center" justify="center" className={classes.main}>
      <Loader />
    </Flex>
  );
}

const styles = createStyles(() => ({
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
