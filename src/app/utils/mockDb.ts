export interface UserStore {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'active' | 'new';
}

export interface Visitor {
  id: string;
  timestamp: string;
  path: string;
  device: string;
  location: string;
  isNew: boolean;
}

export interface SiteEvent {
  id: string;
  timestamp: string;
  type: 'click_whatsapp' | 'view_page' | 'login_attempt';
  details: string;
}

export const mockUsers: UserStore[] = [
  { id: '1', name: 'Amadou Diop', email: 'amadou@email.com', date: '2026-04-01', status: 'active' },
  { id: '2', name: 'Fatou Sow', email: 'fatou@email.com', date: '2026-04-05', status: 'active' },
  { id: '3', name: 'Moussa Gueye', email: 'moussa@email.com', date: '2026-04-08', status: 'new' },
];

export const getStoredUsers = (): UserStore[] => {
  if (typeof window === 'undefined') return mockUsers;
  const stored = localStorage.getItem('mbelgor_users');
  if (!stored) {
    localStorage.setItem('mbelgor_users', JSON.stringify(mockUsers));
    return mockUsers;
  }
  return JSON.parse(stored);
};

export const addUserToStore = (user: Omit<UserStore, 'id' | 'date' | 'status'>) => {
  const users = getStoredUsers();
  const newUser: UserStore = {
    ...user,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString().split('T')[0],
    status: 'new'
  };
  const updatedUsers = [...users, newUser];
  localStorage.setItem('mbelgor_users', JSON.stringify(updatedUsers));
  return newUser;
};

// --- Visitor Tracking ---

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablette";
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
};

const MOCK_LOCATIONS = ["Dakar, SN", "Saint-Louis, SN", "Paris, FR", "Abidjan, CI", "Casablanca, MA"];

export const trackVisit = (path: string) => {
  if (typeof window === 'undefined') return;
  
  const visitors = getVisitors();
  const visitorId = localStorage.getItem('mbelgor_visitor_id') || Math.random().toString(36).substr(2, 9);
  localStorage.setItem('mbelgor_visitor_id', visitorId);

  const newVisit: Visitor = {
    id: visitorId,
    timestamp: new Date().toISOString(),
    path,
    device: getDeviceType(),
    location: MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)],
    isNew: !localStorage.getItem('mbelgor_returning_user')
  };

  localStorage.setItem('mbelgor_returning_user', 'true');
  
  const updatedVisitors = [newVisit, ...visitors].slice(0, 50); // Keep last 50
  localStorage.setItem('mbelgor_visitors', JSON.stringify(updatedVisitors));
  
  // Also track as event
  trackEvent('view_page', `A consulté ${path}`);
};

export const trackEvent = (type: SiteEvent['type'], details: string) => {
  if (typeof window === 'undefined') return;
  const events = getStoredEvents();
  const newEvent: SiteEvent = {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    type,
    details
  };
  localStorage.setItem('mbelgor_events', JSON.stringify([newEvent, ...events].slice(0, 100)));
};

export const getVisitors = (): Visitor[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mbelgor_visitors');
  return stored ? JSON.parse(stored) : [];
};

export const getStoredEvents = (): SiteEvent[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mbelgor_events');
  return stored ? JSON.parse(stored) : [];
};

export const getStats = () => {
  const users = getStoredUsers();
  const visitors = getVisitors();
  const events = getStoredEvents();
  const today = new Date().toISOString().split('T')[0];

  return {
    totalUsers: users.length,
    newUsersToday: users.filter(u => u.date === today).length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalVisits: visitors.length,
    uniqueVisitors: new Set(visitors.map(v => v.id)).size,
    whatsappClicks: events.filter(e => e.type === 'click_whatsapp' && e.timestamp.startsWith(today)).length,
    currentOnline: Math.floor(Math.random() * 5) + 1 // Simulated live users
  };
};
