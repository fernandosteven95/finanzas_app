"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, ArrowLeftRight, PiggyBank, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Transacciones", href: "/transactions", icon: ArrowLeftRight },
    { name: "Transacciones periódicas", href: "/recurring", icon: Receipt }, // TODO: Change icon to CalendarClock if available
    { name: "Presupuesto", href: "/budget", icon: PiggyBank },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-zinc-950 text-zinc-100 border-r border-zinc-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Finanzas Pro
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-zinc-800 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-transform group-hover:scale-110",
                                    isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                                )}
                            />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button className="flex w-full items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
