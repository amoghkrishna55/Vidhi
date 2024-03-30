import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
// import AppStateProvider from "@/components/providers/state-provider";
import { Toaster } from "@/components/ui/toaster";
// import { SupabaseUserProvider } from "@/components/providers/supabase-user-provider";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIDHI",
  description:
    "AI Powered Collaborative Learning and Project Development Platform for Developers and Professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="apex-theme"
        >
          {/* <AppStateProvider> */}
            {/* <SupabaseUserProvider> */}
              {children}
              <Toaster />
            {/* </SupabaseUserProvider> */}
          {/* </AppStateProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
