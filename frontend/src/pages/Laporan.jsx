import { FileSpreadsheet, Search } from 'lucide-react'
import { useState } from 'react'
import { initialDrivers } from '../data/mockData'

export default function Laporan({ bookings, vehicles, currentUser, addLog }) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleExport = () => {
        const headers = [
            'ID Pesanan',
            'Nama Pegawai',
            'Kendaraan',
            'Driver',
            'Tgl Mulai',
            'Tgl Selesai',
            'Status',
            'Tgl Dibuat',
        ]

        const rows = bookings.map((b) => [
            b.id,
            b.employeeName,
            vehicles.find((v) => v.id === b.vehicleId)?.name || '-',
            initialDrivers.find((d) => d.id === b.driverId)?.name || '-',
            b.startDate,
            b.endDate,
            b.status,
            b.createdAt,
        ])

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.setAttribute('href', url)
        link.setAttribute('download', `Laporan_Pemesanan_Kendaraan_${Date.now()}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        addLog(currentUser.name, 'Melakukan Export Laporan ke Excel/CSV')
    }

    const filteredBookings = bookings.filter((b) => {
        const search = searchTerm.toLowerCase()
        const matchName = b.employeeName.toLowerCase().includes(search)
        const matchVehicle = (vehicles.find((v) => v.id === b.vehicleId)?.name || '').toLowerCase().includes(search)
        const matchStatus = b.status.toLowerCase().includes(search)

        return matchName || matchVehicle || matchStatus
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Laporan Periodik</h2>
                    <p className="text-slate-500 mt-1">Pantau dan unduh laporan riwayat pemesanan.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-400" />
                        </div>

                        <input
                            type="text"
                            placeholder="Cari nama, armada, status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 md:w-80 shadow-sm text-sm"
                        />
                    </div>

                    <button
                        onClick={handleExport}
                        className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-emerald-600 font-semibold whitespace-nowrap"
                    >
                        <FileSpreadsheet size={18} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Detail Pemesan</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Armada Terpilih</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Durasi Waktu</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Akhir</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-600">#{b.id}</td>
                                        <td className="py-4 px-6">
                                            <p className="font-bold text-slate-800">{b.employeeName}</p>
                                            <p className="text-xs text-slate-400 font-medium mt-0.5">Entry: {b.createdAt}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-slate-800">
                                                {vehicles.find((v) => v.id === b.vehicleId)?.name}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5 bg-slate-100 inline-block px-2 py-0.5 rounded">
                                                Driver: {initialDrivers.find((d) => d.id === b.driverId)?.name}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-slate-600">
                                            <div className="bg-slate-50 px-3 py-1.5 rounded-lg inline-block border border-slate-100 whitespace-nowrap">
                                                {b.startDate} <span className="text-slate-400 mx-1">-</span> {b.endDate}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${b.status === 'Disetujui'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                        : b.status === 'Ditolak' || b.status === 'Dibatalkan'
                                                            ? 'bg-red-50 text-red-600 border-red-200'
                                                            : 'bg-amber-50 text-amber-600 border-amber-200'
                                                    }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500">
                                        Tidak ada data yang cocok dengan pencarian "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}