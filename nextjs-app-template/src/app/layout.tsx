import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ThemeContextProvider } from "@quable/ui/theme";
import ReactQueryProvider from "@/providers/react-query";
import { ToastContainer } from "@/components/ToastContainer/ToastContainer";

import "@quable/ui/theme/index.css";
import "@quable/ui/index.css";
import "./globals.css";

const poppinsFont = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quable App Template",
  description: "Quable App Template with Next.js and @quable/ui",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.className} antialiased`}>
        <ReactQueryProvider>
          <ThemeContextProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
            <ToastContainer />
          </ThemeContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
