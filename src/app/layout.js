import { Header } from "@/components/layout/Header";

import { Roboto } from "next/font/google";
import { Provider } from "./../context/Provider";

import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <Provider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t text-center text-gray-500 p-8 mt-16">
              &copy; {new Date().getFullYear()} Gichuki All rights reserved
            </footer>
          </Provider>
        </main>
      </body>
    </html>
  );
}
