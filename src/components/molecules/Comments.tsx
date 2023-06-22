import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { NewCommentForm } from "../forms/NewCommentForm";
import { Divider } from "../ui/Divider";
import { CommentBox } from "./CommentBox";

export function Comments() {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { data } = api.comment.useAll({ slug });

  return (
    <div className="mt-5">
      {!session?.user && !data?.length ? null : <h4 className="text-xl">Comments</h4>}

      {session?.user && <NewCommentForm />}

      {data && data.length > 0 && <Divider className="my-4" />}

      <div className="flex flex-col">
        {data && data.map((comment) => <CommentBox key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}
