import { ReactNode } from "react";
import { PrivateRoute } from "@/components/auth";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default PrivateLayout;
