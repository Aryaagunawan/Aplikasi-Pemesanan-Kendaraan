import { useEffect, useState } from 'react'
import {
  Activity,
  Calendar,
  Car,
  CheckSquare,
  FileText,
  Home,
} from 'lucide-react'

import { getLogsApi } from './api/logApi'
import LoginForm from './components/LoginForm'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import MasterArmada from './pages/MasterArmada'
import Pemesanan from './pages/Pemesanan'
import Persetujuan from './pages/Persetujuan'
import Laporan from './pages/Laporan'
import LogAktivitas from './pages/LogAktivitas'

import { loginApi } from './api/authApi'
import { getVehiclesApi } from './api/vehicleApi'
import { getBookingsApi } from './api/bookingApi'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loginError, setLoginError] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const normalizeVehicle = (v) => ({
    id: v?.id ?? null,
    name: v?.name ?? v?.vehicle_name ?? '-',
    type: v?.type ?? v?.vehicle_type ?? '-',
    owner: v?.owner ?? v?.ownership_status ?? '-',
    fuel: v?.fuel ?? v?.fuel_consumption ?? 0,
    lastService: v?.lastService ?? v?.last_service ?? '-',
  })

  const normalizeBooking = (b) => ({
    id: b?.id ?? null,
    employeeName: b?.employeeName ?? b?.employee_name ?? '-',
    vehicleId: b?.vehicleId ?? b?.vehicle_id ?? null,
    driverId: b?.driverId ?? b?.driver_id ?? null,
    startDate: b?.startDate ?? b?.start_date ?? '-',
    endDate: b?.endDate ?? b?.end_date ?? '-',
    approver1Id: b?.approver1Id ?? b?.approver1_id ?? null,
    approver2Id: b?.approver2Id ?? b?.approver2_id ?? null,
    status: b?.status ?? '-',
    createdAt: b?.createdAt ?? b?.created_at ?? '-',
  })

  const normalizeLog = (log) => ({
    id: log?.id ?? null,
    user: log?.user ?? log?.user_name ?? '-',
    action: log?.action ?? '-',
    timestamp: log?.timestamp ?? log?.created_at ?? '-',
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
      localStorage.removeItem('user')
      return
    }

    try {
      const parsedUser = JSON.parse(savedUser)
      setCurrentUser(parsedUser)
    } catch (error) {
      console.error('Gagal membaca user dari localStorage:', error)
      localStorage.removeItem('user')
    }
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!currentUser) return

      try {
        setLoading(true)

        const [vehicleRes, bookingRes, logRes] = await Promise.allSettled([
          getVehiclesApi(),
          getBookingsApi(),
          getLogsApi(),
        ])

        const rawVehicles =
          vehicleRes.status === 'fulfilled'
            ? vehicleRes.value?.data?.data || vehicleRes.value?.data || []
            : []

        const rawBookings =
          bookingRes.status === 'fulfilled'
            ? bookingRes.value?.data?.data || bookingRes.value?.data || []
            : []

        const rawLogs =
          logRes.status === 'fulfilled'
            ? logRes.value?.data?.data || logRes.value?.data || []
            : []

        if (vehicleRes.status === 'rejected') {
          console.error('GET /vehicles gagal:', vehicleRes.reason)
        }

        if (bookingRes.status === 'rejected') {
          console.error('GET /bookings gagal:', bookingRes.reason)
        }

        if (logRes.status === 'rejected') {
          console.error('GET /logs gagal:', logRes.reason)
        }

        const mappedVehicles = Array.isArray(rawVehicles)
          ? rawVehicles.map(normalizeVehicle)
          : []

        const mappedBookings = Array.isArray(rawBookings)
          ? rawBookings.map(normalizeBooking)
          : []

        const activeBookings = mappedBookings.filter(
          (b) => b.status !== 'Dibatalkan'
        )

        const mappedLogs = Array.isArray(rawLogs)
          ? rawLogs.map(normalizeLog)
          : []

        setVehicles(mappedVehicles)
        setBookings(activeBookings)
        setLogs(mappedLogs)
      } catch (error) {
        console.error('Gagal ambil data awal:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [currentUser])

  const addLog = (user, action) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
      user,
      action,
    }

    setLogs((prev) => [newLog, ...(prev || [])])
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setIsSubmitting(true)

    try {
      const payload = {
        username: e.target.username.value,
        password: e.target.password.value,
      }

      const result = await loginApi(payload)

      const token = result?.token
      const user = result?.user

      if (!token || !user) {
        setLoginError('Response login tidak lengkap dari backend')
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      setCurrentUser(user)
      setActiveTab('dashboard')
      addLog(user.name, 'Berhasil login ke sistem')
    } catch (error) {
      console.error('Login error:', error)
      setLoginError(
        error?.response?.data?.message ||
        error?.message ||
        'Login gagal, silakan coba lagi.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    if (currentUser?.name) {
      addLog(currentUser.name, 'Logout dari sistem')
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentUser(null)
    setVehicles([])
    setBookings([])
    setLogs([])
    setActiveTab('dashboard')
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={22} />,
      roles: ['admin', 'approver'],
    },
    {
      id: 'armada',
      label: 'Master Armada',
      icon: <Car size={22} />,
      roles: ['admin'],
    },
    {
      id: 'pemesanan',
      label: 'Pemesanan',
      icon: <Calendar size={22} />,
      roles: ['admin'],
    },
    {
      id: 'persetujuan',
      label: 'Persetujuan',
      icon: <CheckSquare size={22} />,
      roles: ['approver'],
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: <FileText size={22} />,
      roles: ['admin', 'approver'],
    },
    {
      id: 'log',
      label: 'Log Aktivitas',
      icon: <Activity size={22} />,
      roles: ['admin'],
    },
  ]

  if (!currentUser) {
    return (
      <LoginForm
        loginError={loginError}
        handleLogin={handleLogin}
        isSubmitting={isSubmitting}
      />
    )
  }

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
          {loading && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              Memuat data dari server...
            </div>
          )}

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