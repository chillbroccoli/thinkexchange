import { Avatar as MantineAvatar, AvatarProps, createStyles } from "@mantine/core";

export function Avatar(props: AvatarProps) {
  const { classes } = styles();

  return (
    <MantineAvatar
      color="indigo"
      alt="Avatar"
      radius="xl"
      p={3}
      {...props}
      className={classes.avatar}
    />
  );
}

const styles = createStyles((theme) => ({
  avatar: {
    textTransform: "uppercase",
    border: `1px solid ${theme.colors.indigo[5]}`,
  },
}));
