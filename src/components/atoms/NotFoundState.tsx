import { IconMoodSad } from "@tabler/icons-react";

export function NotFoundState() {
  return (
    <div className="p-4 mt-4 border-2 border-black bg-cyan-400">
      <div className="flex">
        <div className="flex-shrink-0">
          <IconMoodSad className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">404</h3>
          <div className="mt-2 text-sm">
            <p>No more projects to be found</p>
          </div>
        </div>
      </div>
    </div>
  );
}
