import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using generic Inter for now, can switch
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finanzas Pro",
  description: "Gestión financiera inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn(inter.className, "bg-zinc-950 text-zinc-50 flex h-screen overflow-hidden")}>
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Background Gradient Blob */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

          <Navbar />
          <main className="flex-1 overflow-auto p-8 relative z-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
