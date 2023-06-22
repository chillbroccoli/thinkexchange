import { IconMoodSad } from "@tabler/icons-react";

export function BookmarksNotFound() {
  return (
    <div className="p-4 mt-4 border-2 border-black bg-cyan-400">
      <div className="flex">
        <div className="flex-shrink-0">
          <IconMoodSad className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">404 - Nothing Found</h3>
          <div className="mt-2 text-sm">
            <p>You haven&apos;t bookmarked anyhing yet!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
