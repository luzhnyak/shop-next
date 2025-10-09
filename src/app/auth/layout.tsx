import { ReactNode } from "react";

import { RouteGuard } from "@/components/auth";
import { ResponsiveAppBar } from "@/components/common/ResponsiveAppBar";
import { CustomContainer } from "@/components/ui/CustomContainer";

const RestrictedLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <RouteGuard access="restricted">
      <ResponsiveAppBar />
      <CustomContainer>{children}</CustomContainer>
    </RouteGuard>
  );
};

export default RestrictedLayout;
