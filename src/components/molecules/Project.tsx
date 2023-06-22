import { Oxygen } from "next/font/google";
import { useSession } from "next-auth/react";

import { Comments } from "~/components/molecules/Comments";
import { cn } from "~/utils/helpers/cn";
import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Badge } from "../ui/Badge";
import { SettingsMenu } from "./SettingsMenu";

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export function Project({ project }: { project?: ProjectResponse }) {
  const { data: session } = useSession();

  if (!project) return null;

  const { title, description, content, tags, user } = project;

  return (
    <div className="relative p-5 px-5 bg-white border-2 border-black sm:px-10">
      {user.id === session?.user.id && <SettingsMenu />}

      <div className="flex flex-col">
        <div>
          <h1 className="mt-1 text-3xl font-semibold">{title}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag.id}># {tag.name}</Badge>
          ))}
        </div>

        <div className="my-2 mt-6 mb-8">
          <p className="text-gray-700">{description}</p>
        </div>

        <div
          className={cn("prose", oxygen.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>

      <Comments />
    </div>
  );
}
