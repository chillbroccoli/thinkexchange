import NiceModal from "@ebay/nice-modal-react";
import { Menu, Transition } from "@headlessui/react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

import { api } from "~/utils/api";
import { QUERY_KEYS } from "~/utils/constants/keys";
import { dayjs } from "~/utils/dayjs";
import { cn } from "~/utils/helpers/cn";
import { toast } from "~/utils/helpers/toast";
import { queryClient } from "~/utils/queryClient";
import { CommentResponse } from "~/utils/schemas/comment.schema";

import { UpdateCommentModal } from "../modals/UpdateCommentModal";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/IconButton";

export function CommentBox({ comment }: { comment: CommentResponse }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { mutate } = api.comment.useDelete(
    { slug },
    {
      onSuccess: () => {
        toast({
          title: "Comment deleted",
          description: "Your comment has been deleted",
        });
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
      },
    }
  );

  return (
    <>
      <div className="flex items-start justify-start mt-4">
        <div>
          <Avatar src={comment.user?.image} alt="Avatar" size="sm" />
        </div>
        <div className="w-full p-3 ml-4 border-2 border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-800 capitalize md:text-base">{comment.user?.name}</p>
              <p className="hidden ml-2 text-sm font-light text-gray-700 md:block">
                {dayjs(comment.createdAt).fromNow()}
              </p>
            </div>
            {comment.user.id === session?.user.id && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <IconButton size="xs" icon={<IconDots size={16} />} />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-48 mt-1 origin-top-right bg-white border-2 border-black divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cn(
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              "flex items-center justify-center px-4 py-2 text-sm w-full"
                            )}
                            onClick={() => NiceModal.show(UpdateCommentModal, { comment })}
                          >
                            <IconEdit size={16} className="mr-2" /> Update
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cn(
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              "flex items-center justify-center px-4 py-2 text-sm w-full"
                            )}
                            onClick={() => mutate({ id: comment.id })}
                          >
                            <IconTrash size={16} className="mr-2" /> Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          <p className="mt-5 text-gray-800">{comment.content}</p>
        </div>
      </div>
    </>
  );
}
