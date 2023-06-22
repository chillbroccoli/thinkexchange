import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { toast } from "~/utils/helpers/toast";
import { queryClient } from "~/utils/queryClient";
import {
  CommentResponse,
  UpdateCommentInput,
  updateCommentSchema,
} from "~/utils/schemas/comment.schema";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "./Modal";

type UpdateCommentModalProps = {
  comment: CommentResponse;
};

export const UpdateCommentModal = NiceModal.create(({ comment }: UpdateCommentModalProps) => {
  const modal = useModal();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { mutateAsync } = api.comment.useUpdate(
    {
      slug,
      id: comment.id,
    },
    {
      onSuccess: () => {
        toast({
          title: "Comment updated",
          description: "Your comment has been updated",
        });
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        modal.remove();
      },
    }
  );

  const methods = useForm<UpdateCommentInput>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      content: comment.content ?? "",
    },
  });

  const onSubmit = async (data: UpdateCommentInput) => {
    await mutateAsync(data);
  };

  return (
    <Modal isOpen={modal.visible} onClose={modal.remove} className="w-[350px]">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input.Textarea name="content" />

          <div className="flex justify-end gap-2 mt-5">
            <Button intent="lime" onClick={modal.remove}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
});
