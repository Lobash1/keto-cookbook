import "./globals.css";
import { Montserrat } from "next/font/google";
import AppThemeProvider from "@/components/AppThemeProvider";
import Header from "@/components/Header";
import { ToastProvider } from "@/components/toast/ToastProvider";

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
      <body className={montserrat.className}>
        <ToastProvider>
          <AppThemeProvider>
            <Header />
            <main>{children}</main>
          </AppThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
