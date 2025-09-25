import { AnimatedButton } from '@/components/ui/AnimatedButton';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

/*
TO-DO:
-------
 - create page open camera
 - side layout on Content for comments/likes/saves/user
 - play bar on content video length
 - double speed hold down on right side of screen (only)
*/

export default function BottomTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarInactiveTintColor: '#e0e0e09d',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <Entypo name="home" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused, color }) => <Feather name="users" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarButton: (props) => <AnimatedButton onPress={props.onPress} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ focused, color }) => <Ionicons name="chatbox-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
