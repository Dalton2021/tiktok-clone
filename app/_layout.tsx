import { Stack } from 'expo-router';
import React from 'react';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(bottom-tabs)">
      <Stack.Screen name="(bottom-tabs)" />
      <Stack.Screen name="search" />
    </Stack>
  );
};

export default RootLayout;
