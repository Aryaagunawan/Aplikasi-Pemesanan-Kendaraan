import { AlertCircle, Car } from 'lucide-react'

export default function LoginForm({ loginError, handleLogin }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08142d] px-6 py-10">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_28%)]" />
                <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(90deg,#03102b_0%,#0b1833_35%,#13203d_100%)]" />
                <div className="absolute top-16 right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-10 left-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-[505px]">
                <div className="rounded-[36px] border border-white/10 bg-white/[0.08] shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="px-10 py-12 sm:px-12 sm:py-14">
                        {/* Header */}
                        <div className="mb-10 text-center">
                            <div className="mx-auto mb-7 flex h-[74px] w-[74px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#5b5cf6] to-[#4f46e5] shadow-[0_10px_35px_rgba(91,92,246,0.45)]">
                                <Car className="h-8 w-8 text-white" />
                            </div>

                            <h1 className="text-[28px] font-extrabold tracking-tight text-white sm:text-[30px]">
                                ArmadaPro
                            </h1>

                            <p className="mt-2 text-[15px] font-medium text-[#b8c1d9]">
                                Enterprise Vehicle Management
                            </p>
                        </div>

                        {/* Error */}
                        {loginError && (
                            <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                <p>{loginError}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <input
                                name="username"
                                type="text"
                                required
                                placeholder="Username"
                                className="h-[60px] w-full rounded-[16px] border border-white/10 bg-white/[0.10] px-6 text-[15px] text-white placeholder:text-white/35 outline-none transition focus:border-indigo-400/50 focus:bg-white/[0.14] focus:ring-2 focus:ring-indigo-500/20"
                            />

                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className="h-[60px] w-full rounded-[16px] border border-white/10 bg-white/[0.10] px-6 text-[15px] text-white placeholder:text-white/35 outline-none transition focus:border-indigo-400/50 focus:bg-white/[0.14] focus:ring-2 focus:ring-indigo-500/20"
                            />

                            <button
                                type="submit"
                                className="mt-2 h-[60px] w-full rounded-[16px] bg-[#6366f1] text-[16px] font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] transition hover:bg-[#7073ff] active:scale-[0.99]"
                            >
                                Masuk ke Sistem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}