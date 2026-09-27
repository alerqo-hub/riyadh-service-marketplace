import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'customer' | 'provider';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileCompleted: boolean;
  // Provider specific fields
  serviceCategory?: string;
  licenseNumber?: string;
  yearsExperience?: number;
  bio?: string;
  bankAccount?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  completeProviderProfile: (providerData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Simulated API call - replace with real backend
    const mockUsers = JSON.parse(await AsyncStorage.getItem('appUsers') || '[]');
    const foundUser = mockUsers.find(
      (u: User) => u.email === email
    );

    if (!foundUser) {
      throw new Error('بيانات الدخول غير صحيحة');
    }

    setUser(foundUser);
    await AsyncStorage.setItem('user', JSON.stringify(foundUser));
  };

  const signup = async (email: string, password: string, name: string, phone: string) => {
    // Check if user exists
    const mockUsers = JSON.parse(await AsyncStorage.getItem('appUsers') || '[]');
    if (mockUsers.some((u: User) => u.email === email)) {
      throw new Error('البريد الإلكتروني مستخدم بالفعل');
    }

    // Create new user (without role yet - will be selected next)
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'customer',
      profileCompleted: false,
      createdAt: new Date().toISOString(),
    };

    // Store in app
    mockUsers.push(newUser);
    await AsyncStorage.setItem('appUsers', JSON.stringify(mockUsers));
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const selectRole = async (role: UserRole) => {
    if (!user) throw new Error('No user found');

    const updatedUser = { ...user, role };
    const needsProfileCompletion = role === 'provider';
    updatedUser.profileCompleted = !needsProfileCompletion;

    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

    // Update in appUsers
    const mockUsers = JSON.parse(await AsyncStorage.getItem('appUsers') || '[]');
    const userIndex = mockUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
      await AsyncStorage.setItem('appUsers', JSON.stringify(mockUsers));
    }
  };

  const completeProviderProfile = async (providerData: Partial<User>) => {
    if (!user) throw new Error('No user found');

    const updatedUser: User = {
      ...user,
      ...providerData,
      profileCompleted: true,
    };

    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

    // Update in appUsers
    const mockUsers = JSON.parse(await AsyncStorage.getItem('appUsers') || '[]');
    const userIndex = mockUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
      await AsyncStorage.setItem('appUsers', JSON.stringify(mockUsers));
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('No user found');

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

    // Update in appUsers
    const mockUsers = JSON.parse(await AsyncStorage.getItem('appUsers') || '[]');
    const userIndex = mockUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
      await AsyncStorage.setItem('appUsers', JSON.stringify(mockUsers));
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user && user.profileCompleted,
        login,
        signup,
        selectRole,
        completeProviderProfile,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
