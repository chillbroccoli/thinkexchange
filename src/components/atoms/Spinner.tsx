import { IconLoader2 } from "@tabler/icons-react";

export function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <IconLoader2 className="animate-spin" />
    </div>
  );
}
