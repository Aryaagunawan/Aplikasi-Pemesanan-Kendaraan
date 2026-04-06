import { AlertCircle, Car, ShieldCheck } from 'lucide-react'

export default function LoginForm({ loginError, handleLogin }) {
    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-6 py-10">
            {/* Background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-[-120px] right-[-80px] h-80 w-80 rounded-full bg-indigo-600/25 blur-3xl" />
                <div className="absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.14),transparent_25%)]" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-[30px] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">
                    {/* Top accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />

                    <div className="p-8 sm:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
                                <Car className="h-8 w-8 text-white" />
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white">
                                ArmadaPro
                            </h1>

                            <p className="mt-2 text-sm text-slate-300">
                                Sistem Manajemen Kendaraan Operasional
                            </p>

                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                <ShieldCheck size={14} />
                                Login Aman & Profesional
                            </div>
                        </div>

                        {/* Error */}
                        {loginError && (
                            <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                <p>{loginError}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-200">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Masukkan username"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-200 focus:border-indigo-400 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Masukkan password"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-200 focus:border-indigo-400 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-cyan-400 active:translate-y-0"
                            >
                                Masuk ke Sistem
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center text-xs text-slate-400">
                            © 2026 ArmadaPro • Enterprise Vehicle Management
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}