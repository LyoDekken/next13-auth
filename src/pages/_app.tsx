"use client";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../contexts/Auth";
import { ReactNode } from "react";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: Record<string, unknown>;
}): ReactNode {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
