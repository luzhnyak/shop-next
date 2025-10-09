import { ReactNode } from "react";

import { ResponsiveAppBar } from "@/components/ResponsiveAppBar";
import { CustomContainer } from "@/components/ui/CustomContainer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ResponsiveAppBar />
      <CustomContainer>{children}</CustomContainer>
    </>
  );
}
