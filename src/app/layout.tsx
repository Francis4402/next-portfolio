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
  description: "Project Portfolio showcasing projects with Next.js",
  
  // OpenGraph Metadata
  openGraph: {
    title: "Francis Portfolio",
    description: "Project Portfolio showcasing projects with Next.js",
    url: "https://your-portfolio-domain.com", // Replace with your actual domain
    siteName: "Francis Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Francis Portfolio - Next.js Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    title: "Francis Portfolio",
    description: "Project Portfolio showcasing projects with Next.js",
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
    images: ["/og-image.png"], // Same as OpenGraph image
  },
  
  // Additional Metadata
  keywords: ["Next.js", "React", "Portfolio", "Web Development", "Projects"],
  authors: [{ name: "Francis" }],
  creator: "Francis",
  publisher: "Francis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
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
