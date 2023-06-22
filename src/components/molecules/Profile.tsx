import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";

import { profileNav } from "~/utils/constants";
import { ClientRoutes } from "~/utils/constants/routes";
import { cn } from "~/utils/helpers/cn";

import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

export function Profile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center justify-center">
        <Menu.Button className="inline-flex items-center justify-center w-full text-sm font-semibold text-gray-900 rounded-full shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <Avatar src={session.user?.image} size="sm" />
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
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border-2 border-black divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="block px-4 py-2 text-sm">
              <p className="font-medium text-gray-800 capitalize">{session.user?.name}</p>
              <p className="text-xs font-light text-gray-700">{session.user?.email}</p>
            </div>
            {profileNav.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={cn(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              <div className="px-2 mt-2">
                <Button
                  fullWidth
                  size="xs"
                  onClick={() =>
                    void signOut({
                      redirect: true,
                      callbackUrl: ClientRoutes.HOME,
                    })
                  }
                >
                  Log out
                </Button>
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
