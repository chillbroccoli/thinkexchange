import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { cn } from "~/utils/helpers/cn";

const sizes = {
  sm: "h-[305px]",
  md: "h-[405px]",
  default: "h-[505px]",
};

export function TagList({ size }: { size?: keyof typeof sizes }) {
  const router = useRouter();

  const { data } = api.tag.useAll();

  return (
    <div className={cn("overflow-scroll", size ? sizes[size] : sizes["default"])}>
      <div className="flex flex-col">
        {data &&
          data.map((tag) => (
            <button
              key={tag.id}
              className="px-4 pl-0 rounded-md hover:bg-cyan-100 hover:text-cyan-600"
              onClick={() =>
                router.push(Routing.getInterpolatedRoute([ClientRoutes.TAG, { tag: tag.name }]))
              }
            >
              <div className="flex items-center p-1 mb-1">
                <p># </p>
                <p className="ml-1 font-light">{tag.name}</p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
