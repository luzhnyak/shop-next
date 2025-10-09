import { ReactNode } from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";

import { StoreProvider } from "@/redux/storeProvider";
import { AuthProvider } from "@/components/auth";

import "./globals.css";

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
                {children}
                <ToastContainer />
              </AppRouterCacheProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
