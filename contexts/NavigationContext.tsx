import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

interface NavigationContextType {
  navigationState: 'welcome' | 'auth' | 'roleSelect' | 'providerSetup' | 'app';
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isSignedIn } = useAuth();

  let navigationState: 'welcome' | 'auth' | 'roleSelect' | 'providerSetup' | 'app' = 'welcome';

  if (!isLoading) {
    if (isSignedIn) {
      navigationState = 'app';
    } else if (user && !user.role) {
      navigationState = 'roleSelect';
    } else if (user && user.role === 'provider' && !user.profileCompleted) {
      navigationState = 'providerSetup';
    } else if (user) {
      navigationState = 'auth';
    } else {
      navigationState = 'welcome';
    }
  }

  return (
    <NavigationContext.Provider value={{ navigationState }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
