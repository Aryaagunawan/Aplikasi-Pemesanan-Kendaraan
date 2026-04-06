import { Activity, Calendar, Check, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { initialDrivers, initialUsers } from '../data/mockData'

export default function Pemesanan({
    currentUser,
    vehicles,
    bookings,
    setBookings,
    addLog,
}) {
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const newBooking = {
            id: bookings.length + 1,
            employeeName: e.target.employeeName.value,
            vehicleId: parseInt(e.target.vehicleId.value),
            driverId: parseInt(e.target.driverId.value),
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            approver1Id: parseInt(e.target.approver1Id.value),
            approver2Id: parseInt(e.target.approver2Id.value),
            status: 'Menunggu Persetujuan 1',
            createdAt: new Date().toLocaleString('id-ID'),
        }

        setBookings([newBooking, ...bookings])
        addLog(currentUser.name, `Membuat pesanan baru untuk ${newBooking.employeeName}`)
        setShowForm(false)
        e.target.reset()
    }

    const handleCancel = (id) => {
        const updatedBookings = bookings.map((b) =>
            b.id === id ? { ...b, status: 'Dibatalkan' } : b
        )

        setBookings(updatedBookings)
        addLog(currentUser.name, `Membatalkan pesanan ID #${id} secara manual`)
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Pemesanan</h2>
                    <p className="text-slate-500 mt-1">Kelola data jadwal dan alokasi kendaraan operasional.</p>
                </div>

                {currentUser.role === 'admin' && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all font-semibold ${showForm
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {showForm ? <X size={18} /> : <Plus size={18} />}
                        <span>{showForm ? 'Batal Input' : 'Buat Pesanan Baru'}</span>
                    </button>
                )}
            </div>

            {showForm && currentUser.role === 'admin' && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mr-3">
                            <Calendar size={20} />
                        </span>
                        Form Registrasi Pemesanan
                    </h3>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Nama Pegawai Pemesan</label>
                            <input required name="employeeName" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Pilih Kendaraan</label>
                            <select required name="vehicleId" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Pilih Kendaraan Operasional --</option>
                                {vehicles.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.name} - {v.type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Pilih Driver</label>
                            <select required name="driverId" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Tugaskan Driver --</option>
                                {initialDrivers.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Tgl Mulai</label>
                                <input required name="startDate" type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Tgl Selesai</label>
                                <input required name="endDate" type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Persetujuan Level 1</label>
                            <select required name="approver1Id" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Pilih Approver 1 --</option>
                                {initialUsers.filter((u) => u.level === 1).map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Persetujuan Level 2</label>
                            <select required name="approver2Id" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Pilih Approver 2 --</option>
                                {initialUsers.filter((u) => u.level === 2).map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
                            <button type="submit" className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-bold">
                                Simpan & Ajukan Pesanan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Informasi Pemesan</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Kendaraan Terpilih</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Jadwal Pakai</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status & Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6 text-sm font-semibold text-slate-500">#{b.id}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                                                {b.employeeName.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-slate-800">{b.employeeName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-medium text-slate-800">
                                            {vehicles.find((v) => v.id === b.vehicleId)?.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Driver: {initialDrivers.find((d) => d.id === b.driverId)?.name}
                                        </p>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                                        {b.startDate} <span className="text-slate-300 mx-1">→</span> {b.endDate}
                                    </td>
                                    <td className="py-4 px-6 flex items-center justify-between">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${b.status === 'Disetujui'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    : b.status === 'Ditolak' || b.status === 'Dibatalkan'
                                                        ? 'bg-red-50 text-red-600 border-red-200'
                                                        : 'bg-amber-50 text-amber-600 border-amber-200'
                                                }`}
                                        >
                                            {b.status === 'Disetujui' && <Check size={12} className="mr-1.5" />}
                                            {(b.status === 'Ditolak' || b.status === 'Dibatalkan') && (
                                                <X size={12} className="mr-1.5" />
                                            )}
                                            {b.status.includes('Menunggu') && (
                                                <Activity size={12} className="mr-1.5 animate-pulse" />
                                            )}
                                            {b.status}
                                        </span>

                                        {b.status.includes('Menunggu') && (
                                            <button
                                                onClick={() => handleCancel(b.id)}
                                                className="ml-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                title="Batalkan Pesanan"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}