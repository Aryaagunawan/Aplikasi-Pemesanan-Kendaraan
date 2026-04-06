import { useState } from 'react'
import {
  Activity,
  Calendar,
  Car,
  CheckSquare,
  FileText,
  Home,
} from 'lucide-react'

import LoginForm from './components/LoginForm'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import MasterArmada from './pages/MasterArmada'
import Pemesanan from './pages/Pemesanan'
import Persetujuan from './pages/Persetujuan'
import Laporan from './pages/Laporan'
import LogAktivitas from './pages/LogAktivitas'

import {
  initialBookings,
  initialLogs,
  initialUsers,
  initialVehiclesData,
} from './data/mockData'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loginError, setLoginError] = useState('')

  const [vehicles, setVehicles] = useState(initialVehiclesData)
  const [bookings, setBookings] = useState(initialBookings)
  const [logs, setLogs] = useState(initialLogs)

  const addLog = (user, action) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
      user,
      action,
    }

    setLogs((prev) => [newLog, ...prev])
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')

    const username = e.target.username.value
    const password = e.target.password.value

    const user = initialUsers.find(
      (u) => u.username === username && u.password === password
    )

    if (user) {
      setCurrentUser(user)
      setActiveTab('dashboard')
      addLog(user.name, 'Berhasil login ke sistem')
    } else {
      setLoginError('Username atau Password yang Anda masukkan salah!')
    }
  }

  const handleLogout = () => {
    addLog(currentUser.name, 'Logout dari sistem')
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <LoginForm loginError={loginError} handleLogin={handleLogin} />
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={22} />, roles: ['admin', 'approver'] },
    { id: 'armada', label: 'Master Armada', icon: <Car size={22} />, roles: ['admin'] },
    { id: 'pemesanan', label: 'Pemesanan', icon: <Calendar size={22} />, roles: ['admin'] },
    { id: 'persetujuan', label: 'Persetujuan', icon: <CheckSquare size={22} />, roles: ['approver'] },
    { id: 'laporan', label: 'Laporan', icon: <FileText size={22} />, roles: ['admin', 'approver'] },
    { id: 'log', label: 'Log Aktivitas', icon: <Activity size={22} />, roles: ['admin'] },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        handleLogout={handleLogout}
      />

      <div className="flex-1 ml-72 p-10 overflow-y-auto h-screen relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-72 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard bookings={bookings} vehicles={vehicles} />
          )}

          {activeTab === 'armada' && currentUser.role === 'admin' && (
            <MasterArmada
              currentUser={currentUser}
              vehicles={vehicles}
              setVehicles={setVehicles}
              addLog={addLog}
            />
          )}

          {activeTab === 'pemesanan' && currentUser.role === 'admin' && (
            <Pemesanan
              currentUser={currentUser}
              vehicles={vehicles}
              bookings={bookings}
              setBookings={setBookings}
              addLog={addLog}
            />
          )}

          {activeTab === 'persetujuan' && currentUser.role === 'approver' && (
            <Persetujuan
              currentUser={currentUser}
              bookings={bookings}
              setBookings={setBookings}
              vehicles={vehicles}
              addLog={addLog}
            />
          )}

          {activeTab === 'laporan' && (
            <Laporan
              bookings={bookings}
              vehicles={vehicles}
              currentUser={currentUser}
              addLog={addLog}
            />
          )}

          {activeTab === 'log' && currentUser.role === 'admin' && (
            <LogAktivitas logs={logs} />
          )}
        </div>
      </div>
    </div>
  )
}