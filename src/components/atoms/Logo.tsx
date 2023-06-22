import Image from "next/image";
import Link from "next/link";

import { ClientRoutes } from "~/utils/constants/routes";

export function Logo() {
  return (
    <div>
      <Link href={ClientRoutes.HOME}>
        <div className="relative overflow-hidden border-2 border-black bg-cyan-200">
          <Image src="/thinkexchange.png" alt="Logo" width={36} height={36} />
        </div>
      </Link>
    </div>
  );
}
