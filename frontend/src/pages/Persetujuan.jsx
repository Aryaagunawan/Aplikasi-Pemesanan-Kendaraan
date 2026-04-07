import { Calendar, Car, Check, CheckSquare, X } from 'lucide-react'
import { useState } from 'react'
import { initialDrivers } from '../data/mockData'
import { approveBookingApi } from '../api/bookingApi'

export default function Persetujuan({
    currentUser,
    bookings = [],
    setBookings,
    vehicles = [],
    addLog,
}) {
    const [processingId, setProcessingId] = useState(null)

    const pendingApprovals = bookings.filter((b) => {
        if (Number(currentUser?.level) === 1) {
            return (
                b?.status === 'Menunggu Persetujuan 1' &&
                (
                    b?.approver1Id == null ||
                    Number(b?.approver1Id) === Number(currentUser?.id)
                )
            )
        }

        if (Number(currentUser?.level) === 2) {
            return (
                b?.status === 'Menunggu Persetujuan 2' &&
                (
                    b?.approver2Id == null ||
                    Number(b?.approver2Id) === Number(currentUser?.id)
                )
            )
        }

        return false
    })

    const handleApprove = async (id, isApprove) => {
        try {
            setProcessingId(id)

            const payload = {
                level: currentUser?.level,
                approved: isApprove,
                user_name: currentUser?.name || 'System',
            }

            const result = await approveBookingApi(id, payload)
            const rawBooking = result?.data || result

            let fallbackStatus = '-'

            if (!isApprove) {
                fallbackStatus = 'Ditolak'
            } else if (Number(currentUser?.level) === 1) {
                fallbackStatus = 'Menunggu Persetujuan 2'
            } else if (Number(currentUser?.level) === 2) {
                fallbackStatus = 'Disetujui'
            }

            const normalizedBooking = {
                id: rawBooking?.id ?? id,
                employeeName: rawBooking?.employeeName ?? rawBooking?.employee_name,
                vehicleId: rawBooking?.vehicleId ?? rawBooking?.vehicle_id,
                driverId: rawBooking?.driverId ?? rawBooking?.driver_id,
                startDate: rawBooking?.startDate ?? rawBooking?.start_date,
                endDate: rawBooking?.endDate ?? rawBooking?.end_date,
                approver1Id: rawBooking?.approver1Id ?? rawBooking?.approver1_id,
                approver2Id: rawBooking?.approver2Id ?? rawBooking?.approver2_id,
                status: rawBooking?.status ?? fallbackStatus,
                createdAt: rawBooking?.createdAt ?? rawBooking?.created_at,
            }

            setBookings((prev) =>
                (prev || []).map((b) =>
                    Number(b.id) === Number(id)
                        ? { ...b, ...normalizedBooking }
                        : b
                )
            )

            if (!isApprove) {
                addLog(currentUser.name, `Menolak pesanan ID #${id}`)
            } else if (Number(currentUser?.level) === 1) {
                addLog(currentUser.name, `Menyetujui pesanan ID #${id} (Level 1)`)
            } else if (Number(currentUser?.level) === 2) {
                addLog(currentUser.name, `Menyetujui pesanan ID #${id} (Final)`)
            }
        } catch (error) {
            console.error('Gagal memproses persetujuan:', error)
            console.error('Response backend:', error?.response?.data)
            alert(error?.response?.data?.message || 'Gagal memproses persetujuan')
        } finally {
            setProcessingId(null)
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Tugas Persetujuan
                </h2>
                <p className="text-slate-500 mt-1">
                    Daftar pemesanan kendaraan yang membutuhkan otorisasi Anda.
                </p>
            </div>

            {pendingApprovals.length === 0 ? (
                <div className="bg-white p-16 text-center rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <CheckSquare className="h-10 w-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Semua Tugas Selesai!</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">
                        Tidak ada permintaan pemesanan kendaraan yang menunggu persetujuan Anda saat ini.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pendingApprovals.map((b) => {
                        const vehicle =
                            vehicles.find((v) => Number(v.id) === Number(b?.vehicleId)) || null

                        const driver =
                            initialDrivers.find((d) => Number(d.id) === Number(b?.driverId)) || null

                        const employeeName = b?.employeeName || '-'
                        const createdDate = b?.createdAt
                            ? String(b.createdAt).split(' ')[0]
                            : '-'

                        return (
                            <div
                                key={b?.id}
                                className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                            >
                                <div className="p-6 border-b border-slate-50 bg-gradient-to-br from-white to-slate-50/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-200">
                                            Ref: #{b?.id ?? '-'}
                                        </span>

                                        <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">
                                            {createdDate}
                                        </span>
                                    </div>

                                    <div className="flex items-center mb-1">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white flex items-center justify-center font-bold text-lg mr-3 shadow-sm shrink-0">
                                            {employeeName !== '-' ? employeeName.charAt(0) : '?'}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                            {employeeName}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4 text-sm flex-1">
                                    <div className="flex items-start">
                                        <Car className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                Kendaraan
                                            </p>
                                            <p className="font-semibold text-slate-800">
                                                {vehicle?.name || '-'}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Driver: {driver?.name || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Calendar className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium mb-0.5">
                                                Jadwal Penggunaan
                                            </p>
                                            <p className="font-semibold text-slate-800">
                                                {b?.startDate || '-'}{' '}
                                                <span className="text-slate-400 mx-1">s/d</span>{' '}
                                                {b?.endDate || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex space-x-3">
                                    <button
                                        onClick={() => handleApprove(b.id, false)}
                                        disabled={processingId === b.id}
                                        className="flex-1 bg-white border border-red-200 text-red-600 py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-red-50 font-semibold disabled:opacity-60"
                                    >
                                        <X size={18} />
                                        <span>
                                            {processingId === b.id ? 'Memproses...' : 'Tolak'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleApprove(b.id, true)}
                                        disabled={processingId === b.id}
                                        className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-emerald-600 font-semibold disabled:opacity-60"
                                    >
                                        <Check size={18} />
                                        <span>
                                            {processingId === b.id ? 'Memproses...' : 'Setujui'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}