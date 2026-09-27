import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { NavigationProvider } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { View } from 'react-native';

function RootLayoutNav() {
  const { isLoading } = useAuth();
  const { navigationState } = useNavigation();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FC', justifyContent: 'center', alignItems: 'center' }}>
        {/* Splash screen placeholder */}
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {navigationState === 'welcome' && (
        <Stack.Screen
          name="auth"
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
      )}
      {navigationState !== 'app' && (
        <Stack.Screen
          name="auth"
          options={{
            gestureEnabled: false,
          }}
        />
      )}
      {navigationState === 'app' && (
        <Stack.Screen
          name="(tabs)"
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <RootLayoutNav />
      </NavigationProvider>
    </AuthProvider>
  );
}
