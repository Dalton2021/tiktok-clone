import Feather from '@expo/vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRouter, withLayoutContext } from 'expo-router';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const numberOfTabs = 4;
  const indicatorWidth = 25;
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: insets.top,
          left: 0,
          right: 0,
          flexDirection: 'row',
          backgroundColor: 'transparent',
          zIndex: 2,
          height: 50,
        }}
        pointerEvents="box-none">
        <View style={{ flex: 4 }} pointerEvents="auto" />
        <Pressable
          onPress={() => {
            router.push('/search');
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            paddingBottom: 10,
            height: 50,
          }}>
          <Text
            style={{
              color: '#e0e0e09d',
              fontSize: 18,
              fontWeight: '700',
            }}>
            <Feather name="search" size={24} />
          </Text>
        </Pressable>
      </View>

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
          tabBarLabelStyle: {
            width: '100%',
            textAlign: 'auto',
            height: '100%',
            fontSize: 16,
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          },
          tabBarInactiveTintColor: '#e0e0e09d',
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            height: 2,
            width: indicatorWidth,
            bottom: 10
          },
          tabBarIndicatorContainerStyle: {
            marginLeft: (screenWidth / numberOfTabs - indicatorWidth) / 2.5,
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
