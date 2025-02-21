import { client, setAuthToken } from '@/api/httpClient';
import { Login } from '@/types/Login';
import { Register } from '@/types/Register';
import { create } from 'zustand';

interface AuthState {
  userName: string | null;
  token: string | null;
  login: (data: Login) => Promise<void>;
  registration: (data: Register) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  userName: typeof window !== 'undefined' ? localStorage.getItem('name') : null,

  login: async (data: Login) => {
    try {
      const response = await client.post('/auth/login', data);
      setAuthToken(response.data);
      set({ token: response.data.token });
      set({ userName: response.data.firsfName + ' ' + response.data.lastName });
    } catch (err) {
      console.error(err);
      throw new Error('Login failed');
    }
  },

  registration: async (data) => {
    try {
      await client.post('/auth/registration', data);
    } catch (err) {
      console.error(err);
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    setAuthToken(null);
    set({ token: null, userName: null });
  },
}));
