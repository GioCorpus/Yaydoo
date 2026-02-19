import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import { useAuthStore } from '../src/store/authStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Basic protection logic
    if (!isAuthenticated) {
      // Ideally we check segments but waiting for mount is safer here
      // We rely on LoginScreen logic to push us to (tabs) when auth is true
      // And we rely on the implementation plan to show login first if not auth
      // But creating a redirect here is good practice:
      // if (segments[0] !== 'login') router.replace('/login');
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {!isAuthenticated ? (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
