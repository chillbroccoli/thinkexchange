import { IconLoader2 } from "@tabler/icons-react";

export function LoaderLayout() {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
      <IconLoader2 size={32} className="animate-spin" />
    </div>
  );
}
