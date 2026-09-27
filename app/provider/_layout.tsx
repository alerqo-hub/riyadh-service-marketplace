import { Stack } from 'expo-router';

export default function ProviderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="verification" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
