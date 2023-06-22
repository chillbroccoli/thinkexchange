import { Disclosure } from "@headlessui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Logo } from "~/components/atoms/Logo";
import { SearchBar } from "~/components/atoms/SearchBar";
import { Profile } from "~/components/molecules/Profile";
import { profileNav } from "~/utils/constants";
import { ClientRoutes } from "~/utils/constants/routes";

import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { LinkButton } from "../ui/LinkButton";
import { TagList } from "./TagList";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <Disclosure as="nav" className="bg-yellow-200 shadow">
      {({ open, close }) => (
        <>
          <div className="w-[90%] sm:w-auto mx-auto max-w-6xl">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center flex-shrink-0 space-x-4">
                  <Logo />
                  <SearchBar close={close} />
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IconX className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <IconMenu2 className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {session?.user ? (
                  <Profile />
                ) : (
                  <LinkButton href={ClientRoutes.LOGIN}>Log in</LinkButton>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-black border-y">
              <TagList size="sm" />
            </div>
            {session?.user ? (
              <div className="pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar src={session.user.image} size="lg" />
                  </div>
                  <div className="ml-2">
                    <div className="text-base text-gray-900">{session.user.name}</div>
                    <div className="text-sm text-gray-800">{session.user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {profileNav.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      as={Link}
                      href={item.href}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <div className="px-2">
                    <Disclosure.Button
                      as={Button}
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
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3">
                <div className="px-2">
                  <Disclosure.Button as={LinkButton} fullWidth size="xs" href={ClientRoutes.LOGIN}>
                    Log in
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
