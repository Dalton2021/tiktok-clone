import { Stack } from 'expo-router';
import React from 'react';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#000',
        },
      }}
      initialRouteName="(bottom-tabs)">
      <Stack.Screen name="(bottom-tabs)" />
      <Stack.Screen name="search" />
      <Stack.Screen
        name="create"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default RootLayout;
