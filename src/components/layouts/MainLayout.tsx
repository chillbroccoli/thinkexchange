import { Box } from "@mantine/core";

import { LoaderLayout } from "~/components/layouts/LoaderLayout";
import { Navbar } from "~/components/Navbar";

export function MainLayout({
  children,
  showLoader,
}: {
  children: React.ReactNode;
  showLoader?: boolean;
}) {
  return (
    <Box>
      <Navbar />
      {showLoader ? <LoaderLayout /> : <Box pb={100}>{children}</Box>}
    </Box>
  );
}
