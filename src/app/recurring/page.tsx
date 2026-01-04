import { getRecurringTransactions, getAccounts, getCategories } from "@/lib/actions";
import { RecurringManager } from "@/components/recurring/RecurringManager";

export default async function RecurringPage() {
    const rawTransactions = await getRecurringTransactions();
    const rawAccounts = await getAccounts();
    const categories = await getCategories();

    const transactions = rawTransactions.map(t => ({
        ...t,
        amount: Number(t.amount),
        account: {
            ...t.account,
            balance: Number(t.account.balance)
        }
    }));

    const accounts = rawAccounts.map(a => ({
        ...a,
        balance: Number(a.balance)
    }));

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent w-fit">
                    Transacciones Periódicas
                </h1>
                <p className="text-zinc-400 mt-1">Gestiona ingresos y gastos que se repiten automáticamente.</p>
            </div>

            <RecurringManager
                transactions={transactions}
                accounts={accounts}
                categories={categories}
            />
        </div>
    );
}
