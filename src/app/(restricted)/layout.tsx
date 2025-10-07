import { ReactNode } from "react";
import { RestrictedRoute } from "@/components/auth";

const RestrictedLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <RestrictedRoute>{children}</RestrictedRoute>;
};

export default RestrictedLayout;
