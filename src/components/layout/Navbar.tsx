"use client";

import { Bell, Search, User, Settings } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4 text-zinc-400 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 w-96">
                <Search className="h-4 w-4" />
                <input
                    type="text"
                    placeholder="Buscar transacciones..."
                    className="bg-transparent border-none outline-none text-sm text-zinc-200 w-full placeholder:text-zinc-600"
                />
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/settings"
                    className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-full transition-colors"
                    title="Configuración"
                >
                    <Settings className="h-5 w-5" />
                </Link>
                <button className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-full transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                </button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1px]">
                    <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}
