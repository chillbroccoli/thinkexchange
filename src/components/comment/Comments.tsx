import { Box, Divider, Flex, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { NewCommentForm } from "../forms/NewCommentForm";
import { CommentBox } from "./CommentBox";

export function Comments() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data } = api.comment.useAll({ slug });

  return (
    <Box mt={20}>
      {!session?.user && !data?.length ? null : <Title order={4}>Comments</Title>}

      {session?.user && <NewCommentForm />}

      {data && data.length > 0 && <Divider my={20} />}

      <Box>
        <Flex direction="column">
          {data && data.map((comment) => <CommentBox key={comment.id} comment={comment} />)}
        </Flex>
      </Box>
    </Box>
  );
}
