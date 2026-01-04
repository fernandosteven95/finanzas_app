"use client";

import { createTransaction } from "@/lib/actions";
import { PlusCircle } from "lucide-react";

export function TransactionForm() {
    return (
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PlusCircle className="text-emerald-400" />
                Nueva Transacción
            </h3>

            {/* 
        This form connects DIRECTLY to the Server Action. 
        No API endpoints, no fetch(), just HTML functionality power-up.
      */}
            <form action={createTransaction} className="space-y-4">
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Concepto</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="Ej: Salario Mensual"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none transition-colors"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Monto</label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Tipo</label>
                        <select
                            name="type"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none transition-colors appearance-none"
                        >
                            <option value="INCOME">Ingreso</option>
                            <option value="EXPENSE">Gasto</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                >
                    Guardar Transacción
                </button>
            </form>
        </div>
    );
}
