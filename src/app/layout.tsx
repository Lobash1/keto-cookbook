import "./globals.css";
import { Montserrat } from "next/font/google";
import AppThemeProvider from "@/components/AppThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import AuthStatus from "@/components/AuthStatus";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Keto Cookbook",
  description: "A cookbook for keto recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${montserrat.className} bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
        suppressHydrationWarning
      >
        <AppThemeProvider>
          <ThemeToggle />
          <AuthStatus />
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
