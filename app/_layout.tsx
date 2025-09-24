import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="(tabs)" options={{ title: 'Home' }} />
      <Tabs.Screen name="friends" options={{ title: 'Friends' }} />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarButton: (props) => <AnimatedButton onPress={props.onPress} />,
        }}
      />
      <Tabs.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
