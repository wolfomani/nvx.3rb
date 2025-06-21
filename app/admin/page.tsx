import { ServiceStatus } from "@/components/admin/service-status"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">
      <div className="container mx-auto px-4 py-8">
        <ServiceStatus />
      </div>
    </div>
  )
}
