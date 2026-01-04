import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from "lucide-react";
import { TransactionForm } from "@/components/dashboard/TransactionForm";

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Hola, Fernando</h1>
          <p className="text-zinc-400 mt-1">Aquí tienes el resumen de tus finanzas hoy.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
          + Nueva Transacción
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Saldo Total"
          amount="$12,450.00"
          trend="+2.5%"
          isPositive={true}
          icon={Wallet}
          color="cyan"
        />
        <StatsCard
          title="Ingresos (Mes)"
          amount="$4,200.00"
          trend="+12%"
          isPositive={true}
          icon={ArrowUpRight}
          color="emerald"
        />
        <StatsCard
          title="Gastos (Mes)"
          amount="$2,450.00"
          trend="-5%"
          isPositive={false}
          icon={ArrowDownRight}
          color="red"
        />
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-zinc-300 mb-4">Proyección Anual</h3>
          <div className="h-full w-full flex items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 border-dashed">
            Gráfico de Proyección (Próximamente)
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-zinc-300 mb-4">Gastos por Categoría</h3>
          <div className="h-full w-full flex items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 border-dashed">
            Donut Chart
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, amount, trend, isPositive, icon: Icon, color }: any) {
  const colorMap: any = {
    cyan: "bg-cyan-500/10 text-cyan-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm hover:border-zinc-700 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-zinc-400 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-zinc-100 mt-1">{amount}</h3>
    </div>
  );
}
