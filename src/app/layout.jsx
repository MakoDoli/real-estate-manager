import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { FilterProvider } from "@/providers/FilterProvider";

const mediumFont = localFont({
  src: "./fonts/firago-latin-500-normal.ttf",
  fallback: ["sans-serif"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mediumFont.className}  antialiased min-h-screen`}>
        <ReactQueryProvider>
          <FilterProvider>
            <Header />
            {children}
          </FilterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
