import { ReactNode } from "react";

import { ResponsiveAdminAppBar } from "@/components/common/ResponsiveAdminAppBar";
import { RouteGuard } from "@/components/auth";
import { CustomContainer } from "@/components/ui/CustomContainer";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <RouteGuard access="private">
      <ResponsiveAdminAppBar />
      <CustomContainer>{children}</CustomContainer>
    </RouteGuard>
  );
};

export default PrivateLayout;
