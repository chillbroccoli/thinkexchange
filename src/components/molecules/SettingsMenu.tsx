import { Menu, Transition } from "@headlessui/react";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { api } from "~/utils/api";
import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { cn } from "~/utils/helpers/cn";
import { toast } from "~/utils/helpers/toast";

import { IconButton } from "../ui/IconButton";

export function SettingsMenu() {
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { mutate: deleteProject } = api.project.useDelete({
    onSuccess: () => {
      toast({
        title: "Project deleted",
        description: "Your project has been deleted",
      });
      router.push(ClientRoutes.HOME);
    },
  });

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="absolute top-5 right-5">
          <IconButton icon={<IconSettings size={20} />} />
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
        <Menu.Items className="absolute right-0 z-10 w-48 mt-8 mr-2 origin-top-right bg-white border-2 border-black divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={cn(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center justify-center px-4 py-2 text-sm w-full"
                  )}
                  onClick={() => {
                    router.push(
                      Routing.getInterpolatedRoute([ClientRoutes.EDIT_PROJECT, { slug }])
                    );
                  }}
                >
                  <IconEdit size={16} className="mr-2" /> Edit Project
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
                  onClick={() => deleteProject({ slug })}
                >
                  <IconTrash size={16} className="mr-2" /> Delete Project
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
