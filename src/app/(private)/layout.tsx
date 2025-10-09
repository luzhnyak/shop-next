import { ReactNode } from "react";
import { PrivateRoute } from "@/components/auth";
import { ResponsiveAppBar } from "@/components/ResponsiveAppBar";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <PrivateRoute>
      <ResponsiveAppBar />
      {children}
    </PrivateRoute>
  );
};

export default PrivateLayout;
