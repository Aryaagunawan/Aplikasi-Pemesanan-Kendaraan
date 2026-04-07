import { Activity } from 'lucide-react'

export default function LogAktivitas({ logs = [] }) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Log Aktivitas Sistem
                </h2>
                <p className="text-slate-500 mt-1">
                    Jejak rekaman aktivitas pengguna aplikasi.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8">
                    {logs.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            Belum ada data log aktivitas.
                        </div>
                    ) : (
                        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                            {logs.map((log) => (
                                <div key={log?.id} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-indigo-500 shadow-sm"></div>

                                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-shadow">
                                        <p className="text-sm text-slate-800">
                                            <span className="font-extrabold text-indigo-600 mr-2">
                                                {log?.user || '-'}
                                            </span>
                                            <span className="font-medium text-slate-600">
                                                {log?.action || '-'}
                                            </span>
                                        </p>

                                        <p className="text-xs font-bold text-slate-400 mt-2 flex items-center">
                                            <Activity size={12} className="mr-1" />
                                            {log?.timestamp || '-'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}