import { supabase } from "./supabaseClient";

export interface UserStore {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'active' | 'new';
}

export interface Visitor {
  id?: string;
  visitor_id: string;
  timestamp: string;
  path: string;
  device: string;
  location: string;
  is_new: boolean;
}

export interface SiteEvent {
  id?: string;
  timestamp: string;
  type: 'click_whatsapp' | 'view_page' | 'login_attempt';
  details: string;
}

export interface Order {
  id?: string;
  created_at?: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  items: any;
  status: 'pending' | 'completed' | 'cancelled';
}

const MOCK_LOCATIONS = ["Dakar, SN", "Saint-Louis, SN", "Paris, FR", "Abidjan, CI", "Casablanca, MA"];

const getDeviceType = () => {
  if (typeof window === 'undefined') return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablette";
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
};

// --- Visitor Tracking ---

export const trackVisit = async (path: string) => {
  if (typeof window === 'undefined') return;
  
  const visitorId = localStorage.getItem('mbelgor_visitor_id') || Math.random().toString(36).substr(2, 9);
  localStorage.setItem('mbelgor_visitor_id', visitorId);

  const isReturning = localStorage.getItem('mbelgor_returning_user');
  localStorage.setItem('mbelgor_returning_user', 'true');

  const { error } = await supabase.from('visitors').insert({
    visitor_id: visitorId,
    path,
    device: getDeviceType(),
    location: MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)],
    is_new: !isReturning
  });

  if (error) console.error("Error tracking visit:", error);
  
  // Also track as event for the combined feed
  trackEvent('view_page', `A consulté ${path}`);
};

export const trackEvent = async (type: SiteEvent['type'], details: string) => {
  const { error } = await supabase.from('site_events').insert({
    type,
    details
  });
  if (error) console.error("Error tracking event:", error);
};

// --- Data Retrieval ---

export const getVisitors = async (): Promise<Visitor[]> => {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(50);
  
  return error ? [] : (data as Visitor[]);
};

export const getStoredEvents = async (): Promise<SiteEvent[]> => {
  const { data, error } = await supabase
    .from('site_events')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100);
  
  return error ? [] : (data as SiteEvent[]);
};

export const getStats = async () => {
  const today = new Date().toISOString().split('T')[0];

  const [visitorsRes, eventsRes, ordersRes] = await Promise.all([
    supabase.from('visitors').select('id', { count: 'exact' }),
    supabase.from('site_events').select('id', { count: 'exact' }).eq('type', 'click_whatsapp').gte('timestamp', today),
    supabase.from('orders').select('id', { count: 'exact' })
  ]);

  return {
    totalUsers: 0, // Users linked to Supabase Auth would be fetched differently
    totalVisits: visitorsRes.count || 0,
    whatsappClicks: eventsRes.count || 0,
    totalOrders: ordersRes.count || 0,
    currentOnline: Math.floor(Math.random() * 5) + 1 // Still simulated for now
  };
};

// --- Orders ---

export const createOrder = async (order: Omit<Order, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('orders').insert(order).select().single();
  if (error) throw error;
  return data;
};

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  return error ? [] : (data as Order[]);
};
