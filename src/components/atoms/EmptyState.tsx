import { IconFolderPlus, IconPlus } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { ClientRoutes } from "~/utils/constants/routes";

import { LinkButton } from "../ui/LinkButton";

export function EmptyState() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <IconFolderPlus size={48} className="text-gray-900" stroke={1} />
      <p className="my-2 text-lg font-semibold">No projects found</p>
      {session?.user && (
        <>
          <p className="my-1">Get started by creating one</p>
          <LinkButton intent="lime" className="mt-5" href={ClientRoutes.NEW_PROJECT}>
            <IconPlus size={20} />
            New Project
          </LinkButton>
        </>
      )}
    </div>
  );
}
