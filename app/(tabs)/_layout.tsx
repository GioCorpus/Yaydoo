import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

// I'll stick to hardcoded colors or check theme.ts content first?
// Inspecting theme.ts content earlier: {"name":"theme.ts","sizeBytes":"1630"}
// I better check theme.ts to be safe, but for now I'll use a local valid implementation or standard coloring.

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = colorScheme === 'dark' ? '#10b981' : '#059669'; // Emerald-500/600

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#1e293b' : '#e2e8f0',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <TabBarIcon name="credit-card" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color }) => <TabBarIcon name="heartbeat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
