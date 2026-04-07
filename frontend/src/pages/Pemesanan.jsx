import { Activity, Calendar, Check, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { initialDrivers, initialUsers } from '../data/mockData'
import { createBookingApi, cancelBookingApi } from '../api/bookingApi'

export default function Pemesanan({
    currentUser,
    vehicles = [],
    bookings = [],
    setBookings,
    addLog,
}) {
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [cancelingId, setCancelingId] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSubmitting(true)

            const payload = {
                employee_name: e.target.employeeName.value.trim(),
                vehicle_id: Number(e.target.vehicleId.value),
                driver_id: Number(e.target.driverId.value),
                start_date: e.target.startDate.value,
                end_date: e.target.endDate.value,
                approver1_id: Number(e.target.approver1Id.value),
                approver2_id: Number(e.target.approver2Id.value),
                user_name: currentUser?.name || 'System',
            }



            if (
                !payload.employee_name ||
                !payload.vehicle_id ||
                !payload.driver_id ||
                !payload.start_date ||
                !payload.end_date ||
                !payload.approver1_id ||
                !payload.approver2_id
            ) {
                alert('Semua field booking wajib diisi')
                return
            }

            const result = await createBookingApi(payload)
            const rawBooking = result?.data || result

            const normalizedBooking = {
                id: rawBooking?.id ?? null,
                employeeName:
                    rawBooking?.employeeName ??
                    rawBooking?.employee_name ??
                    payload.employee_name,
                vehicleId:
                    rawBooking?.vehicleId ??
                    rawBooking?.vehicle_id ??
                    payload.vehicle_id,
                driverId:
                    rawBooking?.driverId ??
                    rawBooking?.driver_id ??
                    payload.driver_id,
                startDate:
                    rawBooking?.startDate ??
                    rawBooking?.start_date ??
                    payload.start_date,
                endDate:
                    rawBooking?.endDate ??
                    rawBooking?.end_date ??
                    payload.end_date,
                approver1Id:
                    rawBooking?.approver1Id ??
                    rawBooking?.approver1_id ??
                    payload.approver1_id,
                approver2Id:
                    rawBooking?.approver2Id ??
                    rawBooking?.approver2_id ??
                    payload.approver2_id,
                status: rawBooking?.status ?? 'Menunggu Persetujuan 1',
                createdAt:
                    rawBooking?.createdAt ??
                    rawBooking?.created_at ??
                    new Date().toLocaleString('id-ID'),
            }

            setBookings((prev) => [normalizedBooking, ...(prev || [])])

            addLog(
                currentUser.name,
                `Membuat pesanan baru untuk ${payload.employee_name}`
            )

            setShowForm(false)
            e.target.reset()
        } catch (error) {
            console.error('Gagal membuat pesanan:', error)
            console.error('Response backend:', error?.response?.data)
            alert(error?.response?.data?.message || 'Gagal membuat pesanan')
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancel = async (id) => {
        try {
            setCancelingId(id)

            await cancelBookingApi(id, {
                user_name: currentUser?.name || 'System',
            })


            setBookings((prev) =>
                (prev || []).filter((b) => Number(b.id) !== Number(id))
            )

            addLog(currentUser.name, `Membatalkan pesanan ID #${id}`)
        } catch (error) {
            console.error('Gagal membatalkan pesanan:', error)
            alert(error?.response?.data?.message || 'Gagal membatalkan pesanan')
        } finally {
            setCancelingId(null)
        }
    }



    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Manajemen Pemesanan
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Kelola data jadwal dan alokasi kendaraan operasional.
                    </p>
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

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                    >
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Nama Pegawai Pemesan
                            </label>
                            <input
                                required
                                name="employeeName"
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Pilih Kendaraan
                            </label>
                            <select
                                required
                                name="vehicleId"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">-- Pilih Kendaraan Operasional --</option>
                                {vehicles.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.name || '-'} - {v.type || '-'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Pilih Driver
                            </label>
                            <select
                                required
                                name="driverId"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
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
                                <label className="block text-sm font-semibold text-slate-700">
                                    Tgl Mulai
                                </label>
                                <input
                                    required
                                    name="startDate"
                                    type="date"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Tgl Selesai
                                </label>
                                <input
                                    required
                                    name="endDate"
                                    type="date"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Persetujuan Level 1
                            </label>
                            <select
                                required
                                name="approver1Id"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">-- Pilih Approver 1 --</option>
                                {initialUsers
                                    .filter((u) => u.level === 1)
                                    .map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Persetujuan Level 2
                            </label>
                            <select
                                required
                                name="approver2Id"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">-- Pilih Approver 2 --</option>
                                {initialUsers
                                    .filter((u) => u.level === 2)
                                    .map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-bold disabled:opacity-60"
                            >
                                {submitting ? 'Menyimpan...' : 'Simpan & Ajukan Pesanan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">
                        Daftar Pemesanan Kendaraan
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Data pemesanan terbaru dan status proses persetujuan.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Informasi Pemesan
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Kendaraan Terpilih
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Jadwal Pakai
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Status & Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500">
                                        Belum ada data pemesanan.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((b) => {
                                    const employeeName = b?.employeeName || '-'
                                    const vehicleName =
                                        vehicles.find((v) => Number(v.id) === Number(b?.vehicleId))
                                            ?.name || '-'
                                    const driverName =
                                        initialDrivers.find(
                                            (d) => Number(d.id) === Number(b?.driverId)
                                        )?.name || '-'
                                    const status = b?.status || '-'

                                    return (
                                        <tr key={b?.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-semibold text-slate-500">
                                                #{b?.id ?? '-'}
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                                                        {employeeName !== '-' ? employeeName.charAt(0) : '?'}
                                                    </div>
                                                    <span className="font-semibold text-slate-800">
                                                        {employeeName}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <p className="font-medium text-slate-800">{vehicleName}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Driver: {driverName}
                                                </p>
                                            </td>

                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                                                {b?.startDate || '-'}
                                                <span className="text-slate-300 mx-1">→</span>
                                                {b?.endDate || '-'}
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="grid grid-cols-1 gap-2 min-w-[210px]">
                                                    <span
                                                        className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-bold border ${status === 'Disetujui'
                                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                            : status === 'Ditolak' || status === 'Dibatalkan'
                                                                ? 'bg-red-50 text-red-600 border-red-200'
                                                                : 'bg-amber-50 text-amber-600 border-amber-200'
                                                            }`}
                                                    >
                                                        {status === 'Disetujui' && (
                                                            <Check size={12} className="mr-1.5" />
                                                        )}
                                                        {(status === 'Ditolak' || status === 'Dibatalkan') && (
                                                            <X size={12} className="mr-1.5" />
                                                        )}
                                                        {String(status).includes('Menunggu') && (
                                                            <Activity size={12} className="mr-1.5 animate-pulse" />
                                                        )}
                                                        {status}
                                                    </span>

                                                    {String(status).includes('Menunggu') ? (
                                                        <button
                                                            onClick={() => handleCancel(b.id)}
                                                            disabled={cancelingId === b.id}
                                                            className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-2 rounded-xl transition-all font-semibold text-sm disabled:opacity-60"
                                                            title="Batalkan Pesanan"
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>
                                                                {cancelingId === b.id ? 'Membatalkan...' : 'Batalkan'}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <span className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-medium text-slate-400 border border-slate-200 bg-slate-50">
                                                            Tidak ada aksi
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}