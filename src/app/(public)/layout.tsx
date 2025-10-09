import { ReactNode } from "react";

import { ResponsiveAppBar } from "@/components/common/ResponsiveAppBar";
import { CustomContainer } from "@/components/ui/CustomContainer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ResponsiveAppBar />
      <CustomContainer>{children}</CustomContainer>
    </>
  );
}
