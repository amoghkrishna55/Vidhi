import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIDHI",
  description:
    "Empowering Justice: Your Personal Crime-solving Companion - Connect with our Chatbot for Instant Answers to All Your Crime-related Queries!",
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
              {children}
              <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
