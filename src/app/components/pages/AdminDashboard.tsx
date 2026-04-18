import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, ShoppingBag, TrendingUp, Search, 
  Settings, LogOut, Bell, Filter, Download,
  Globe, Smartphone, Monitor, MousePointer2,
  Package
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { getStats, getVisitors, Visitor, getStoredEvents, SiteEvent, getOrders, Order } from "../../utils/mockDb";
import { SEO } from "../SEO";

// Helper to format relative time
const timeAgo = (dateStr: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "à l'instant";
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  return `il y a ${Math.floor(seconds / 3600)}h`;
};

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
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVisits: 0,
    whatsappClicks: 0,
    totalOrders: 0,
    currentOnline: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const prevVisitorsCount = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initial load
    refreshData();

    // Poll for changes to simulate "live" data
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    try {
      const [newVisitors, newEvents, newStats, newOrders] = await Promise.all([
        getVisitors(),
        getStoredEvents(),
        getStats(),
        getOrders()
      ]);

      setVisitors(newVisitors);
      setEvents(newEvents);
      setStats(newStats);
      setOrders(newOrders);

      // Audio Alert for new visitors
      if (newVisitors.length > prevVisitorsCount.current && prevVisitorsCount.current !== 0) {
        playPing();
      }
      prevVisitorsCount.current = newVisitors.length;
    } catch (err) {
      console.error("Error refreshing dashboard data:", err);
    }
  };

  const playPing = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audioRef.current.volume = 0.3;
    }
    audioRef.current.play().catch(() => {}); // Catch browser autoplay restrictions
  };

  const filteredOrders = orders.filter(o => 
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
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
            { icon: <ShoppingBag size={18} />, label: "Commandes", active: false },
            { icon: <Users size={18} />, label: "Utilisateurs", active: false },
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
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#D6C6B8] transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{stats.currentOnline} En Ligne</span>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Visites Totales", value: stats.totalVisits, trend: "+100%", bg: "bg-white", icon: <Globe size={18} className="text-blue-500" /> },
              { label: "WhatsApp Clicks", value: stats.whatsappClicks, trend: "Aujourd'hui", bg: "bg-white", icon: <MousePointer2 size={18} className="text-green-500" /> },
              { label: "Commandes", value: stats.totalOrders, trend: "Total", bg: "bg-white", icon: <Package size={18} className="text-orange-500" /> },
              { label: "Conversion rate", value: "4.2%", trend: "+1.2%", bg: "bg-white", icon: <ShoppingBag size={18} className="text-purple-500" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.bg} p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-gray-50 rounded-xl">{stat.icon}</div>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-[#111111]">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts & Live Feed Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#3F1010]">Trafic & Engagement</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#D6C6B8]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Visiteurs</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
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

            <div className="bg-[#111111] p-6 rounded-3xl shadow-sm border border-white/5 text-white flex flex-col">
              <div className="flex items-center justify-between mb-8 px-2">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Live Visitors</h4>
                <span className="text-[10px] text-[#D6C6B8] animate-pulse">En direct</span>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {visitors.length > 0 ? visitors.map((vis, i) => (
                    <motion.div 
                      key={vis.timestamp + i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D6C6B8]/20 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {vis.device === 'Mobile' ? <Smartphone size={12} className="text-white/40" /> : <Monitor size={12} className="text-white/40" />}
                          <span className="text-[10px] text-white/80 font-bold">{vis.location}</span>
                        </div>
                        <span className="text-[8px] text-white/20 whitespace-nowrap">{timeAgo(vis.timestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-white/40 truncate max-w-[120px]">Page: <span className="text-[#D6C6B8]">{vis.path}</span></p>
                        {vis.is_new && <span className="text-[8px] bg-[#D6C6B8]/10 text-[#D6C6B8] px-1.5 py-0.5 rounded uppercase font-bold">Nouveau</span>}
                      </div>
                    </motion.div>
                  )) : (
                    <div className="h-full flex items-center justify-center text-white/20 text-xs italic">
                      Aucun visiteur récent...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#3F1010]">Dernières Commandes</h4>
              <div className="flex gap-2">
                <button className="p-2 border rounded-xl hover:bg-gray-50"><Filter size={16} /></button>
                <button className="p-2 border rounded-xl hover:bg-gray-50 text-blue-600"><Download size={16} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    {["Client", "Email", "Date", "Statut", "Montant"].map((head, i) => (
                      <th key={i} className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? filteredOrders.map((order, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#3F1010]/5 flex items-center justify-center text-[#3F1010] text-[10px] font-bold">{order.customer_name[0]}</div>
                          <span className="text-sm text-[#111111] font-medium">{order.customer_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">{order.customer_email}</td>
                      <td className="px-6 py-4 text-xs text-gray-400">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold ${order.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {order.status === 'completed' ? 'Terminé' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-[#111111]">
                        {order.total_amount} FCFA
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm italic">Aucune commande trouvée</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
