import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(bottom-tabs)">
        <Stack.Screen name="(bottom-tabs)" />
        <Stack.Screen name="search" />
        <Stack.Screen
          name="create"
          options={{
            presentation: 'modal',
            animation: 'fade',
            contentStyle: {
              flex: 1,
              backgroundColor: '#000',
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
