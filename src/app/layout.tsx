import { ReactNode } from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";
import { ResponsiveAppBar } from "@/components/ResponsiveAppBar";
import { StoreProvider } from "@/redux/storeProvider";

import { CustomContainer } from "@/components/ui/CustomContainer";
import { AuthProvider } from "@/components/auth";

export const metadata: Metadata = {
  title: "PromConcept project",
  description: "Small project made for education purpose.",
  icons: {
    icon: "/favicon.svg",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <AuthProvider>
            <NextIntlClientProvider messages={messages}>
              <AppRouterCacheProvider options={{ key: "css" }}>
                <ResponsiveAppBar />
                <CustomContainer>{children}</CustomContainer>
              </AppRouterCacheProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
