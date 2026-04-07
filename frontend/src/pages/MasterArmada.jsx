import { Car, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { createVehicleApi } from '../api/vehicleApi'

export default function MasterArmada({
    currentUser,
    vehicles = [],
    setVehicles,
    addLog,
}) {
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleAddVehicle = async (e) => {
        e.preventDefault()

        try {
            setSubmitting(true)

            const name = e.target.name.value.trim()
            const type = e.target.type.value
            const owner = e.target.owner.value
            const fuel = Number(e.target.fuel.value)
            const lastService = e.target.lastService.value
            const userName = currentUser?.name || 'System'

            if (!name || !type || !owner || !fuel || !lastService) {
                alert('Semua field kendaraan wajib diisi')
                return
            }

            const payload = {
                // camelCase
                name,
                type,
                owner,
                fuel,
                lastService,
                userName,

                // snake_case
                vehicle_name: name,
                vehicle_type: type,
                ownership_status: owner,
                fuel_consumption: fuel,
                last_service: lastService,
                user_name: userName,
            }

            console.log('PAYLOAD VEHICLE FRONTEND:', payload)

            const result = await createVehicleApi(payload)
            const rawVehicle = result?.data || result

            const normalizedVehicle = {
                id: rawVehicle?.id ?? null,
                name: rawVehicle?.name ?? rawVehicle?.vehicle_name ?? name,
                type: rawVehicle?.type ?? rawVehicle?.vehicle_type ?? type,
                owner: rawVehicle?.owner ?? rawVehicle?.ownership_status ?? owner,
                fuel: rawVehicle?.fuel ?? rawVehicle?.fuel_consumption ?? fuel,
                lastService:
                    rawVehicle?.lastService ?? rawVehicle?.last_service ?? lastService,
            }

            setVehicles((prev) => [normalizedVehicle, ...(prev || [])])
            addLog(currentUser.name, `Menambahkan armada baru: ${normalizedVehicle.name}`)

            setShowForm(false)
            e.target.reset()
        } catch (error) {
            console.error('Gagal menambah kendaraan:', error)
            console.error('Response backend:', error?.response?.data)
            alert(error?.response?.data?.message || 'Gagal menambah kendaraan')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Master Armada
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Kelola data seluruh kendaraan operasional perusahaan.
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
                        <span>{showForm ? 'Batal Input' : 'Tambah Armada Baru'}</span>
                    </button>
                )}
            </div>

            {showForm && currentUser.role === 'admin' && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mr-3">
                            <Car size={20} />
                        </span>
                        Form Tambah Armada
                    </h3>

                    <form
                        onSubmit={handleAddVehicle}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                    >
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700">
                                Nama/Merek Kendaraan & Lokasi
                            </label>
                            <input
                                required
                                name="name"
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Jenis Kendaraan
                            </label>
                            <select
                                required
                                name="type"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">-- Pilih Jenis --</option>
                                <option value="Angkutan Barang">Angkutan Barang</option>
                                <option value="Angkutan Orang">Angkutan Orang</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Status Kepemilikan
                            </label>
                            <select
                                required
                                name="owner"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">-- Pilih Kepemilikan --</option>
                                <option value="Milik Perusahaan">Milik Perusahaan</option>
                                <option value="Sewa">Sewa dari Vendor</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Rata-rata Konsumsi BBM (km/L)
                            </label>
                            <input
                                required
                                name="fuel"
                                type="number"
                                step="0.1"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Tanggal Servis Terakhir
                            </label>
                            <input
                                required
                                name="lastService"
                                type="date"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-bold disabled:opacity-60"
                            >
                                {submitting ? 'Menyimpan...' : 'Simpan Kendaraan Baru'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.length === 0 ? (
                    <div className="col-span-full bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center text-slate-500">
                        Belum ada data armada.
                    </div>
                ) : (
                    vehicles.map((v) => (
                        <div
                            key={v.id}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <div className="flex justify-between items-start mb-5">
                                <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl">
                                    <Car size={24} />
                                </div>
                                <span className="bg-slate-100 text-slate-500 text-xs font-extrabold px-3 py-1.5 rounded-lg border border-slate-200">
                                    ID: VHC-{String(v?.id ?? 0).padStart(3, '0')}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight mb-1">
                                {v?.name || '-'}
                            </h3>
                            <p className="text-sm font-medium text-indigo-600 mb-5">
                                {v?.type || '-'} • {v?.owner || '-'}
                            </p>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Konsumsi BBM</span>
                                    <span className="font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-md">
                                        {v?.fuel ?? 0} km/L
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Servis Terakhir</span>
                                    <span className="font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-md">
                                        {v?.lastService || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}