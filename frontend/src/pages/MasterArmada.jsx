import { Car, Plus, X } from 'lucide-react'
import { useState } from 'react'

export default function MasterArmada({ currentUser, vehicles, setVehicles, addLog }) {
    const [showForm, setShowForm] = useState(false)

    const handleAddVehicle = (e) => {
        e.preventDefault()

        const newVehicle = {
            id: vehicles.length + 1,
            name: e.target.name.value,
            type: e.target.type.value,
            owner: e.target.owner.value,
            fuel: parseFloat(e.target.fuel.value),
            lastService: e.target.lastService.value,
        }

        setVehicles([newVehicle, ...vehicles])
        addLog(currentUser.name, `Menambahkan armada baru: ${newVehicle.name}`)
        setShowForm(false)
        e.target.reset()
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Master Armada</h2>
                    <p className="text-slate-500 mt-1">Kelola data seluruh kendaraan operasional perusahaan.</p>
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

                    <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700">Nama/Merek Kendaraan & Lokasi</label>
                            <input required name="name" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Jenis Kendaraan</label>
                            <select required name="type" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Pilih Jenis --</option>
                                <option value="Angkutan Barang">Angkutan Barang</option>
                                <option value="Angkutan Orang">Angkutan Orang</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Status Kepemilikan</label>
                            <select required name="owner" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">-- Pilih Kepemilikan --</option>
                                <option value="Milik Perusahaan">Milik Perusahaan</option>
                                <option value="Sewa">Sewa dari Vendor</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Rata-rata Konsumsi BBM (km/L)</label>
                            <input required name="fuel" type="number" step="0.1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Tanggal Servis Terakhir</label>
                            <input required name="lastService" type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                        </div>

                        <div className="col-span-1 md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
                            <button type="submit" className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-bold">
                                Simpan Kendaraan Baru
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                    <div key={v.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-5">
                            <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl">
                                <Car size={24} />
                            </div>
                            <span className="bg-slate-100 text-slate-500 text-xs font-extrabold px-3 py-1.5 rounded-lg border border-slate-200">
                                ID: VHC-{v.id.toString().padStart(3, '0')}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight mb-1">{v.name}</h3>
                        <p className="text-sm font-medium text-indigo-600 mb-5">
                            {v.type} • {v.owner}
                        </p>

                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Konsumsi BBM</span>
                                <span className="font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-md">{v.fuel} km/L</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Servis Terakhir</span>
                                <span className="font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-md">{v.lastService}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}