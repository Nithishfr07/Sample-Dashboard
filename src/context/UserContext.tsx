
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  company: string;
  industry: string;
  companySize: string;
  theme: 'light' | 'dark';
  dashboardLayout: 'grid' | 'list';
  isOnboarded: boolean;
  isLoggedIn: boolean;
}

interface UserState {
  user: User | null;
  loading: boolean;
}

type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'LOGIN'; payload: { email: string; name: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'COMPLETE_ONBOARDING'; payload: Omit<User, 'isLoggedIn' | 'isOnboarded'> };

const initialState: UserState = {
  user: null,
  loading: true,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'LOGIN':
      const newUser: User = {
        name: action.payload.name,
        email: action.payload.email,
        company: '',
        industry: '',
        companySize: '',
        theme: 'light',
        dashboardLayout: 'grid',
        isOnboarded: false,
        isLoggedIn: true,
      };
      return { ...state, user: newUser };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: state.user
          ? { ...state.user, ...action.payload, isOnboarded: true }
          : null,
      };
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  completeOnboarding: (userData: Omit<User, 'isLoggedIn' | 'isOnboarded'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Load user data from localStorage on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: userData });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  useEffect(() => {
    // Save user data to localStorage whenever user state changes
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
      // Apply theme to document
      if (state.user.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      localStorage.removeItem('user');
      document.documentElement.classList.remove('dark');
    }
  }, [state.user]);

  const login = (email: string, name: string) => {
    dispatch({ type: 'LOGIN', payload: { email, name } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const completeOnboarding = (userData: Omit<User, 'isLoggedIn' | 'isOnboarded'>) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: userData });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        logout,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
