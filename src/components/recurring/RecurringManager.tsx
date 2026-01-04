"use client";

import { createRecurringTransaction, deleteRecurringTransaction } from "@/lib/actions";
import { Plus, Trash2, CalendarClock, CreditCard, DollarSign } from "lucide-react";
import { useState } from "react";

function RecurringForm({ accounts, categories, onCancel }: { accounts: any[], categories: any[], onCancel: () => void }) {
    return (
        <form action={async (formData) => {
            await createRecurringTransaction(formData);
            onCancel();
        }} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-zinc-200 font-medium">Nueva Regla</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="description" placeholder="Descripción (ej. Netflix, Sueldo)" className="bg-zinc-950 rounded-lg px-3 py-2 text-sm text-white" required />
                <div className="flex gap-2">
                    <span className="bg-zinc-800 flex items-center px-3 rounded-lg text-zinc-400 text-sm">$</span>
                    <input name="amount" type="number" step="0.01" placeholder="Monto" className="flex-1 bg-zinc-950 rounded-lg px-3 py-2 text-sm text-white" required />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <select name="type" className="bg-zinc-950 rounded-lg px-3 py-2 text-sm text-zinc-300">
                    <option value="EXPENSE">Gasto</option>
                    <option value="INCOME">Ingreso</option>
                </select>
                <select name="frequency" className="bg-zinc-950 rounded-lg px-3 py-2 text-sm text-zinc-300">
                    <option value="MONTHLY">Mensual</option>
                    <option value="BIWEEKLY">Quincenal (Biweekly)</option>
                    <option value="WEEKLY">Semanal</option>
                    <option value="DAILY">Diario</option>
                    <option value="YEARLY">Anual</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <select name="accountId" className="bg-zinc-950 rounded-lg px-3 py-2 text-sm text-zinc-300">
                    {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
                </select>
                {/* Simplified category selection - just flattened list for now or first level */}
                <select name="categoryId" className="bg-zinc-950 rounded-lg px-3 py-2 text-sm text-zinc-300">
                    <option value="">Sin Categoría</option>
                    {categories.map(cat => (
                        <>
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                            {cat.children && cat.children.map((child: any) => (
                                <option key={child.id} value={child.id}>&nbsp;&nbsp;&nbsp;↳ {child.name}</option>
                            ))}
                        </>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-zinc-500">Fecha Inicio</label>
                    <input name="startDate" type="date" className="w-full bg-zinc-950 rounded-lg px-3 py-2 text-sm text-white" required defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-zinc-500">Total Cuotas (Opcional)</label>
                    <input name="totalInstallments" type="number" placeholder="Indefinido" className="w-full bg-zinc-950 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button type="submit" className="bg-emerald-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-400">Guardar</button>
            </div>
        </form>
    );
}

function Section({ title, items, icon: Icon }: { title: string, items: any[], icon: any }) {
    if (items.length === 0) return null;

    return (
        <div className="space-y-3">
            <h3 className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                <Icon className="h-4 w-4" /> {title}
            </h3>
            <div className="grid gap-3">
                {items.map(item => (
                    <div key={item.id} className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl flex items-center justify-between group hover:bg-zinc-800/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${item.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium text-zinc-200">{item.description}</p>
                                <p className="text-xs text-zinc-500">
                                    {item.frequency} • Próx: {new Date(item.nextDate).toLocaleDateString()}
                                    {item.totalInstallments && ` • ${item.installmentsPaid}/${item.totalInstallments}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-zinc-300 font-medium">
                                ${parseFloat(item.amount).toFixed(2)}
                            </span>
                            <form action={deleteRecurringTransaction.bind(null, item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-zinc-600 hover:text-red-400">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RecurringManager({ transactions, accounts, categories }: { transactions: any[], accounts: any[], categories: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    // Filter Logic
    const recurringIncome = transactions.filter(t => t.type === 'INCOME' && !t.totalInstallments);
    const installmentIncome = transactions.filter(t => t.type === 'INCOME' && t.totalInstallments);
    const recurringExpense = transactions.filter(t => t.type === 'EXPENSE' && !t.totalInstallments);
    const installmentExpense = transactions.filter(t => t.type === 'EXPENSE' && t.totalInstallments);

    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                <div className="flex gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Activas: {transactions.length}</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                >
                    <Plus className="h-4 w-4" /> Nueva Regla
                </button>
            </div>

            {isAdding && (
                <RecurringForm
                    accounts={accounts}
                    categories={categories}
                    onCancel={() => setIsAdding(false)}
                />
            )}

            <div className="space-y-8">
                <Section title="Ingresos Recurrentes" items={recurringIncome} icon={DollarSign} />
                <Section title="Ingresos a Plazos (Préstamos)" items={installmentIncome} icon={CalendarClock} />
                <Section title="Gastos Recurrentes (Suscripciones)" items={recurringExpense} icon={CreditCard} />
                <Section title="Gastos a Plazos (Créditos)" items={installmentExpense} icon={CalendarClock} />

                {transactions.length === 0 && !isAdding && (
                    <div className="text-center py-20">
                        <CalendarClock className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-zinc-500 font-medium">No hay reglas definidas</h3>
                        <p className="text-zinc-600 text-sm mt-1">Crea una para automatizar tus finanzas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
