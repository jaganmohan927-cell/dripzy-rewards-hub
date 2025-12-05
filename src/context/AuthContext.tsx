import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  joinedDate: string;
  referralCode: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'dripzy-auth';

// Mock user data
const createMockUser = (email: string, name: string): User => ({
  id: Math.random().toString(36).substr(2, 9),
  email,
  name,
  phone: '+91 98765 43210',
  joinedDate: new Date().toISOString(),
  referralCode: `DRIPZY${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  address: {
    street: '123 Fashion Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock authentication - in real app, this would call an API
    if (!email || !password) {
      return { success: false, error: 'Please enter email and password' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create or retrieve user
    const mockUser = createMockUser(email, email.split('@')[0]);
    setUser(mockUser);
    return { success: true };
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password || !name) {
      return { success: false, error: 'Please fill in all fields' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = createMockUser(email, name);
    setUser(mockUser);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
