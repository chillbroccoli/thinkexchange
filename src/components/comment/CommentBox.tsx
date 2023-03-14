import { ActionIcon, Box, createStyles, Flex, Menu, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Avatar } from "~/components/Avatar";
import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { dayjs } from "~/utils/dayjs";
import { queryClient } from "~/utils/queryClient";
import { CommentResponse } from "~/utils/schemas/comment.schema";

import { UpdateCommentModal } from "../modals/UpdateCommentModal";

export function CommentBox({ comment }: { comment: CommentResponse }) {
  const { data: session } = useSession();
  const router = useRouter();
  const minMediumScreen = useMediaQuery("(min-width: 64em)");
  const maxMediumScreen = useMediaQuery("(max-width: 64em)");
  const [opened, { open, close }] = useDisclosure(false);

  const { slug } = router.query as { slug: string };

  const { classes } = styles();

  const { mutate } = api.comment.useDelete(
    { slug },
    {
      onSuccess: () => {
        showNotification({
          title: "Comment deleted",
          message: "Your comment has been deleted",
        });
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
      },
    }
  );

  return (
    <>
      <Flex align="start" justify="start" mt={10}>
        <Box>
          <Avatar src={comment.user?.image} color="teal" alt="Avatar" />
        </Box>
        <Box p={10} ml={15} w="100%" className={classes.comment}>
          <Flex justify="space-between">
            <Flex align="end">
              <Text transform="capitalize" color="gray.8" fz={maxMediumScreen ? "sm" : "md"}>
                {comment.user?.name}
              </Text>
              {minMediumScreen && (
                <Text ml={10} color="gray.6" fz="sm" fw={300}>
                  {dayjs(comment.createdAt).fromNow()}
                </Text>
              )}
            </Flex>
            {comment.user.id === session?.user.id && (
              <Menu position="top" shadow="md">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconEdit size={20} />} onClick={open}>
                    Update
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconTrash size={20} />}
                    onClick={() => mutate({ id: comment.id })}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>

          <Text mt={20} fw={400} color="gray.9">
            {comment.content}
          </Text>
        </Box>
      </Flex>

      <UpdateCommentModal opened={opened} open={open} close={close} comment={comment} />
    </>
  );
}

const styles = createStyles((theme) => ({
  comment: {
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
  },
}));
