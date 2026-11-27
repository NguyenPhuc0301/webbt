const BUILD_TAG = "mk-8315";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "PTIT Found", template: "%s | PTIT Found" },
  description: "Tìm đồ thất lạc trong trường PTIT"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body data-build={BUILD_TAG}>
        <Providers>
          <Header />
          <main className="container">{children}</main>
          <footer className="footer">PTIT Found · Hệ thống tìm đồ thất lạc trong trường</footer>
        </Providers>
      </body>
    </html>
  );
}
