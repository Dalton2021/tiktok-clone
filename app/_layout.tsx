import { Stack } from 'expo-router';
import React from 'react';

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
