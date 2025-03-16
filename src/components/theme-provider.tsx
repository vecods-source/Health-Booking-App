"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [isClient, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);
  return isClient ? (
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  ) : null;
}
