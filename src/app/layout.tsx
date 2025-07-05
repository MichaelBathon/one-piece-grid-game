import "./globals.css";
import React from "react";
import ThemeProvider from "./theme-provider";
import Providers from "./providers";

export const metadata = {
  title: "One Piece Grid",
  description: "The daily One Piece character grid game for fans!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
