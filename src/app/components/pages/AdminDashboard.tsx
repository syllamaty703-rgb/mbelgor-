import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, ShoppingBag, TrendingUp, Search, 
  Settings, LogOut, Bell, Filter, Download
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { getStoredUsers, getStats, UserStore } from "../../utils/mockDb";
import { SEO } from "../SEO";

const chartData = [
  { name: 'Lun', insc: 4 },
  { name: 'Mar', insc: 7 },
  { name: 'Mer', insc: 5 },
  { name: 'Jeu', insc: 9 },
  { name: 'Ven', insc: 12 },
  { name: 'Sam', insc: 8 },
  { name: 'Dim', insc: 15 },
];

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [users, setUsers] = useState<UserStore[]>([]);
  const [stats, setStats] = useState(getStats());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setUsers(getStoredUsers());
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <SEO title="Dashboard Admin" description="Gestion totale MBELGOR" />

      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] text-white flex flex-col hidden lg:flex">
        <div className="p-8">
          <h1 className="text-xl tracking-[0.3em]" style={{ fontFamily: 'Cinzel, serif' }}>MBELGOR</h1>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Administration</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {[
            { icon: <TrendingUp size={18} />, label: "Vue d'ensemble", active: true },
            { icon: <Users size={18} />, label: "Utilisateurs", active: false },
            { icon: <ShoppingBag size={18} />, label: "Commandes", active: false },
            { icon: <Settings size={18} />, label: "Paramètres", active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-[#D6C6B8] text-[#111111]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              {item.icon}
              <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="flex items-center gap-4 text-white/60 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="text-xs uppercase font-bold">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#D6C6B8] transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-[#111111]">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="w-10 h-10 bg-[#3F1010] rounded-full flex items-center justify-center text-white text-xs font-bold">AD</div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-wider">Admin MBELGOR</p>
                <p className="text-[10px] text-gray-400">Directeur Général</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Inscrits", value: stats.totalUsers, trend: "+12%", bg: "bg-white" },
              { label: "Nouveaux / 24h", value: stats.newUsersToday, trend: "+5%", bg: "bg-white" },
              { label: "Paniers Actifs", value: 8, trend: "+25%", bg: "bg-white" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.bg} p-6 rounded-3xl shadow-sm border border-gray-100`}
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-[#111111]">{stat.value}</h3>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#3F1010]">Croissance Community</h4>
                <select className="text-xs border-none bg-gray-50 rounded-lg p-2 outline-none">
                  <option>7 derniers jours</option>
                  <option>30 jours</option>
                </select>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorInsc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D6C6B8" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#D6C6B8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)'}} 
                    />
                    <Area type="monotone" dataKey="insc" stroke="#D6C6B8" strokeWidth={3} fillOpacity={1} fill="url(#colorInsc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-3xl shadow-sm border border-white/5 text-white">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8 px-2">Top Activités Récentes</h4>
              <div className="space-y-6">
                {[
                  { user: "Aissatou Fall", action: "A ajouté au panier", item: "Le Malik (T42)", time: "il y a 2 min" },
                  { user: "Oumar Sy", action: "S'est inscrit", item: "Client Premium", time: "il y a 15 min" },
                  { user: "Inconnue", action: "Consulte", item: "Collection Femme", time: "il y a 45 min" },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px]">{act.user[0]}</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{act.user}</p>
                      <p className="text-[10px] text-white/40">{act.action} <span className="text-[#D6C6B8]">{act.item}</span></p>
                    </div>
                    <span className="text-[10px] text-white/20 whitespace-nowrap">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#3F1010]">Liste des Clients</h4>
              <div className="flex gap-2">
                <button className="p-2 border rounded-xl hover:bg-gray-50"><Filter size={16} /></button>
                <button className="p-2 border rounded-xl hover:bg-gray-50 text-blue-600"><Download size={16} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    {["Nom", "Email", "Date", "Statut", "Actions"].map((head, i) => (
                      <th key={i} className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#3F1010]/5 flex items-center justify-center text-[#3F1010] text-[10px] font-bold">{user.name[0]}</div>
                          <span className="text-sm text-[#111111] font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">{user.email}</td>
                      <td className="px-6 py-4 text-xs text-gray-400">{user.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold ${user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {user.status === 'active' ? 'Actif' : 'Nouveau'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <button className="text-blue-500 font-bold hover:underline">Voir détails</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
