import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";

import { Avatar } from "~/components/Avatar";
import { Input } from "~/components/Input";
import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { queryClient } from "~/utils/queryClient";
import { CreateCommentInput, createCommentSchema } from "~/utils/schemas/comment.schema";

export function NewCommentForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
  });

  const { mutateAsync } = api.comment.useCreate(
    { slug },
    {
      onSuccess: () => {
        showNotification({
          title: "Comment created",
          message: "Your comment has been created",
        });
        methods.reset();
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
      },
    }
  );

  const onSubmit = async (input: CreateCommentInput) => {
    await mutateAsync(input);
  };

  return (
    <Flex align="start" justify="start" mt={10}>
      <Box>
        <Avatar src={session?.user.image} alt="Avatar" />
      </Box>
      <Box ml={15} w="100%">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input.Textarea name="content" w="100%" />

            {methods.formState.isValid && (
              <Flex justify="flex-end" mt={10}>
                <Button type="submit">Submit</Button>
              </Flex>
            )}
          </form>
        </FormProvider>
      </Box>
    </Flex>
  );
}
