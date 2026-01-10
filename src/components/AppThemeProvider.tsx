"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class" // добавляет class="light" / "dark" на html
      defaultTheme="dark" // по умолчанию тёмная
      enableSystem={true} // можно учитывать системную тему
    >
      {children}
    </ThemeProvider>
  );
}
