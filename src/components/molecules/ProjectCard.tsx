import dayjs from "dayjs";
import Link from "next/link";

import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { trimLongText } from "~/utils/helpers/trimLongText";
import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

export function ProjectCard({ project }: { project: ProjectResponse }) {
  const { slug, title, description, tags, createdAt, user } = project;

  const href = Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug }]);

  return (
    <Link
      href={href}
      className=" bg-white border-2 border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all ease-in-out duration-300"
    >
      <div className="p-4">
        <div className="flex items-center">
          <Avatar src={user.image} className="mr-2" />

          <div>
            <p className="font-medium text-gray-800 capitalize">{user.name}</p>
            <p className="text-sm font-light text-gray-700">
              {dayjs(createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>

          <div className="my-2">
            <p className="text-sm font-light text-gray-700">{trimLongText(description)}</p>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag.id}># {tag.name}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
