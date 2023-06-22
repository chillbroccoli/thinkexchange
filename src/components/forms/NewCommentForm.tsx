import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";

import { Input } from "~/components/ui/Input";
import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { toast } from "~/utils/helpers/toast";
import { queryClient } from "~/utils/queryClient";
import { CreateCommentInput, createCommentSchema } from "~/utils/schemas/comment.schema";

import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

export function NewCommentForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    mode: "onSubmit",
  });

  const { mutateAsync } = api.comment.useCreate(
    { slug },
    {
      onSuccess: () => {
        toast({
          title: "Comment created",
          description: "Your comment has been created",
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
    <div className="flex items-start justify-start mt-5">
      <div>
        <Avatar src={session?.user.image} alt="Avatar" size="sm" />
      </div>
      <div className="w-full ml-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input.Textarea name="content" className="w-full" />

            {methods.formState.isValid && (
              <div className="flex justify-end mt-4">
                <Button type="submit">Submit</Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
