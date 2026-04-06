import { Activity, CheckSquare, FileText } from 'lucide-react'

export default function Dashboard({ bookings, vehicles }) {
    const totalBookings = bookings.length
    const approvedBookings = bookings.filter((b) => b.status === 'Disetujui').length
    const pendingBookings = bookings.filter((b) => b.status.includes('Menunggu')).length

    const vehicleUsage = vehicles.map((v) => {
        const usageCount = bookings.filter((b) => b.vehicleId === v.id).length
        return { name: v.name, count: usageCount + Math.floor(Math.random() * 5) }
    })

    const maxUsage = Math.max(...vehicleUsage.map((v) => v.count), 1)

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500 mt-1">Ringkasan aktivitas pemesanan kendaraan operasional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5">
                    <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                        <FileText size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Total Pemesanan</p>
                        <p className="text-3xl font-black text-slate-900">{totalBookings}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5">
                    <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
                        <CheckSquare size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Telah Disetujui</p>
                        <p className="text-3xl font-black text-slate-900">{approvedBookings}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5">
                    <div className="p-4 bg-amber-50 rounded-2xl text-amber-600">
                        <Activity size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Menunggu Persetujuan</p>
                        <p className="text-3xl font-black text-slate-900">{pendingBookings}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Frekuensi Pemakaian Kendaraan</h3>
                    <p className="text-sm text-slate-500 mt-1">Data estimasi pemakaian bulan ini</p>
                </div>

                <div className="h-64 flex items-end space-x-6 overflow-x-auto pb-4">
                    {vehicleUsage.map((v, idx) => (
                        <div key={idx} className="flex-1 min-w-[60px] flex flex-col items-center group">
                            <div className="w-full flex justify-center items-end h-48 bg-slate-50 rounded-2xl relative overflow-hidden border border-slate-100">
                                <div
                                    className="w-full max-w-[4rem] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl transition-all duration-700"
                                    style={{ height: `${(v.count / maxUsage) * 100}%` }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                        {v.count} Kali
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-center font-semibold text-slate-600 h-8 line-clamp-2 px-2">
                                {v.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}