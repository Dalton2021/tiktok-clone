import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: 'top',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          zIndex: 1,
        },
      }}
      initialRouteName="index">
      <Tabs.Screen name="test" options={{ title: 'Shop' }} />
      <Tabs.Screen name="index" options={{ title: 'For You' }} />
    </Tabs>
  );
}
