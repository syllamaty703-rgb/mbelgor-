export interface UserStore {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'active' | 'new';
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

export const getStats = () => {
  const users = getStoredUsers();
  return {
    totalUsers: users.length,
    newUsersToday: users.filter(u => u.date === new Date().toISOString().split('T')[0]).length,
    activeUsers: users.filter(u => u.status === 'active').length
  };
};
