import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-vertical-timeline-component/style.min.css';
import { getServerSession } from "next-auth";
import { authOptions } from "./utls/authOptions";
import Provider from "./provider/Provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { ToastHandler } from "./utls/ToastHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Francis Portfolio",
  description: "Next js portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Provider session={session}>
            <Toaster position="top-right" duration={2000} />
            <ToastHandler/>
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
