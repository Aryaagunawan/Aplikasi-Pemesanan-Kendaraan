import { Car, LogOut } from 'lucide-react'

export default function Sidebar({
    currentUser,
    activeTab,
    setActiveTab,
    menuItems,
    handleLogout,
}) {
    return (
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="p-8 flex items-center space-x-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md shadow-indigo-200">
                    <Car className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">ArmadaPro</h1>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-600">Enterprise</p>
                </div>
            </div>

            <div className="px-6 mb-8 mt-2 overflow-y-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-2">
                    Menu Utama
                </p>

                <nav className="space-y-1.5">
                    {menuItems
                        .filter((m) => m.roles.includes(currentUser.role))
                        .map((item) => {
                            const isActive = activeTab === item.id

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${isActive
                                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                        }`}
                                >
                                    <div
                                        className={`${isActive
                                                ? 'text-indigo-600'
                                                : 'text-slate-400 group-hover:text-slate-600'
                                            } transition-colors`}
                                    >
                                        {item.icon}
                                    </div>
                                    <span>{item.label}</span>
                                </button>
                            )
                        })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50 m-4 rounded-3xl shrink-0">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-inner shrink-0">
                        {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-slate-900 text-sm truncate">{currentUser.name}</p>
                        <p className="text-xs font-semibold text-slate-500 capitalize">
                            {currentUser.role} {currentUser.level ? `(Lv. ${currentUser.level})` : ''}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 py-2.5 rounded-xl transition-all font-semibold shadow-sm"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    )
}