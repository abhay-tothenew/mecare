import Header from "./components/Header";
import "./globals.css";
import { AuthProvider } from "./utils/context/Authcontext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeCare",
  description: "Book appointments with ease",
  keywords: "healthcare, medical, appointments, booking",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
