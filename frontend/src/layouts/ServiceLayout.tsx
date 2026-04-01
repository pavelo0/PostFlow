import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function ServiceLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <h1>Service Layout</h1>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
