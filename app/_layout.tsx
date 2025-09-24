import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(tabs)" options={{ title: 'Home' }} />
      <Tabs.Screen name="Friends" />
      <Tabs.Screen
        name="Create"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image source={require('../assets/images/addButton.png')} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen name="Inbox" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
