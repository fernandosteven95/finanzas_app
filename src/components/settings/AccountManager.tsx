"use client";

import { createAccount, deleteAccount } from "@/lib/actions";
import { Trash2, Plus, Wallet } from "lucide-react";
import { useState } from "react";

export function AccountManager({ accounts, currencies }: { accounts: any[], currencies: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-zinc-400 text-sm font-medium">Lista de Cuentas</h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                >
                    <Plus className="h-4 w-4" /> Nueva
                </button>
            </div>

            {isAdding && (
                <form action={async (formData) => {
                    await createAccount(formData);
                    setIsAdding(false);
                }}
                    className="bg-zinc-800/50 p-3 rounded-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2"
                >
                    <div className="flex flex-wrap gap-2">
                        <input name="name" placeholder="Nombre (ej. Banco X)" className="flex-1 bg-zinc-950 rounded-lg px-3 py-2 text-sm" required />
                        <select name="type" className="bg-zinc-950 rounded-lg px-2 text-sm text-zinc-300">
                            <option value="CASH">Efectivo</option>
                            <option value="BANK">Banco</option>
                            <option value="CREDIT_CARD">Tarjeta Crédito</option>
                            <option value="INVESTMENT">Inversión</option>
                            <option value="OTHER">Otro</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <select name="currencyId" className="bg-zinc-950 rounded-lg px-2 text-sm text-zinc-300 flex-1">
                            {currencies.map(c => (
                                <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                            ))}
                        </select>
                        <input name="balance" type="number" step="0.01" placeholder="Saldo Inicial..." className="flex-1 bg-zinc-950 rounded-lg px-3 py-2 text-sm" />
                        <button type="submit" className="bg-emerald-500 text-black px-4 rounded-lg text-sm font-bold">Crear</button>
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="bg-zinc-700 text-zinc-300 px-3 rounded-lg text-sm font-medium hover:bg-zinc-600 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {accounts.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <Wallet className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-zinc-200 text-sm font-medium">{acc.name}</p>
                                <p className="text-zinc-500 text-xs">{acc.currency.code} • {acc.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`text-sm font-mono ${acc.balance >= 0 ? 'text-zinc-300' : 'text-red-400'}`}>
                                {acc.currency.symbol} {parseFloat(acc.balance).toFixed(2)}
                            </span>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <form action={deleteAccount.bind(null, acc.id)}>
                                    <button className="text-zinc-500 hover:text-red-400 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
