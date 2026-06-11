import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // <-- 1. We imported it here

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SATMA Platform",
  description: "Security Awareness Training",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* <-- 2. We placed it at the very top of the body */}
        {children}
      </body>
    </html>
  );
}