import { useAuth } from "../context/AuthContext";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export function AdminPage() {
  const { session, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D6C6B8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Initialisation...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard onLogout={signOut} />;
}
