import { LoaderLayout } from "~/components/layouts/LoaderLayout";
import { Navbar } from "~/components/molecules/Navbar";

export function MainLayout({
  children,
  showLoader,
}: {
  children: React.ReactNode;
  showLoader?: boolean;
}) {
  return (
    <div>
      <Navbar />
      {showLoader ? <LoaderLayout /> : <div className="pb-14">{children}</div>}
    </div>
  );
}
