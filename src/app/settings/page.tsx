import { CategoryManager } from "@/components/settings/CategoryManager";
import { AccountManager } from "@/components/settings/AccountManager";
import { getCategories, getAccounts, getCurrencies } from "@/lib/actions";

export default async function SettingsPage() {
    const categories = await getCategories();
    const accounts = await getAccounts();
    const currencies = await getCurrencies();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-white">Configuración</h1>
                <p className="text-zinc-400 mt-1">Administra tus fuentes de dinero y categorías.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Categorías</h2>
                    <CategoryManager categories={categories} />
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-white mb-4">Fuentes de Dinero</h2>
                    <p className="text-zinc-500 text-sm mb-4">Gestiona tus cuentas bancarias y tarjetas.</p>
                    <AccountManager accounts={accounts} currencies={currencies} />
                </div>
            </div>
        </div>
    );
}
