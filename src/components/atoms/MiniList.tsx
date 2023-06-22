import Link from "next/link";

import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { dayjs } from "~/utils/dayjs";
import { ProjectResponse } from "~/utils/schemas/project.schema";

import { Divider } from "../ui/Divider";

export function MiniList({ title, data }: { title: string; data?: ProjectResponse[] }) {
  if (!data) return null;

  return (
    <div className="p-3 px-4 bg-white border-2 border-black">
      <p className="text-lg font-medium"># {title}</p>
      {data && data.length ? <Divider className="my-2" /> : null}
      <div className="flex flex-col space-y-3">
        {data?.map((project) => (
          <Link
            href={Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug: project.slug }])}
            key={project.id}
          >
            <div className="p-1 px-2 transition-colors duration-200 ease-in-out border border-black bg-cyan-700/10 text-cyan-700 hover:bg-cyan-700/20">
              <p className="text-base font-light text-gray-800"># {project.title}</p>
              <p className="text-sm">{dayjs(project.createdAt).format("MMM D, YYYY")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
