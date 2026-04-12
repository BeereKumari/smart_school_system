"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthProvider from "./AuthProvider";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <AuthProvider>
      {isHomePage && <Navbar />}

      {children}

      {isHomePage && <Footer />}
    </AuthProvider>
  );
}