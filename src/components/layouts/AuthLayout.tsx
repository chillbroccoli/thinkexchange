import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

import { IconButton } from "../ui/IconButton";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="w-screen h-screen">
      <IconButton
        intent="lime"
        className="absolute top-5 left-5"
        icon={<IconArrowLeft size={20} />}
        onClick={() => router.back()}
      />
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-[85%] md:w-[400px] p-4 bg-white border border-black rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
}
