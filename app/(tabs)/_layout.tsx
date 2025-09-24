import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const numberOfTabs = 4;
  const indicatorWidth = 25;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          top: insets.top,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0.05,
          zIndex: 1,
          borderBottomWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '700',
        },
        tabBarInactiveTintColor: '#e0e0e09d',
        tabBarActiveTintColor: '#fff',
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
          height: 2,
          width: indicatorWidth,
        },
        tabBarIndicatorContainerStyle: {
          marginLeft: (screenWidth / numberOfTabs - indicatorWidth) / 2, // calculates the width to move left
        },
      }}
      initialRouteName="index">
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="following" options={{ title: 'Following' }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
      <Tabs.Screen name="index" options={{ title: 'For You' }} />
    </Tabs>
  );
}
