import SearchButton from '@/components/ui/SearchButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter, withLayoutContext } from 'expo-router';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TopTabsLayout() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  // const numberOfTabs = 4;
  // const indicatorWidth = 25;

  return (
    <View style={{ flex: 1 }}>
      <SearchButton />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            top: insets.top,
            left: 0,
            right: screenWidth / 6,
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0.05,
            zIndex: 3,
            borderBottomWidth: 0,
            height: 50,
          },
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 12, // Add horizontal padding for spacing
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          tabBarInactiveTintColor: '#e0e0e09d',
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            height: 2,
            // width: indicatorWidth,
            width: 0.25,
            bottom: 10,
          },
          // tabBarIndicatorContainerStyle: {
          //   // marginLeft: (screenWidth / numberOfTabs - indicatorWidth) / 2.5,
          //   // marginLeft: -8,
          // },
          // tabBarScrollEnabled: true, // Enable this to allow content-based sizing
          tabBarContentContainerStyle: {
            paddingHorizontal: 8,
            borderBottomWidth: 0,
          },
        }}
        initialRouteName="index">
        <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
        <Tabs.Screen name="following" options={{ title: 'Following' }} />
        <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
        <Tabs.Screen name="index" options={{ title: 'For You' }} />
      </Tabs>
    </View>
  );
}
