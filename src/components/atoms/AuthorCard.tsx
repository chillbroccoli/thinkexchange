import dayjs from "dayjs";

import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Avatar } from "../ui/Avatar";

export function AuthorCard({ project }: { project?: ProjectResponse }) {
  if (!project) return null;

  const { user, createdAt } = project;

  return (
    <div className="flex px-2 py-3 bg-white border-2 border-black flex-column">
      <div className="flex">
        <Avatar src={user?.image} alt={user.name} />

        <div className="flex flex-col ml-2">
          <p className="font-medium text-gray-800">{user.name}</p>
          <p className="text-sm font-light text-gray-700">
            {dayjs(createdAt).format("MMM D, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
