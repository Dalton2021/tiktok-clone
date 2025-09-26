import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top }]} pointerEvents="box-none">
      <View style={styles.buttonContainer} pointerEvents="auto" />
      <Pressable
        onPress={() => {
          router.push('/search');
        }}
        style={styles.button}>
        <Text style={styles.text}>
          <Feather name="search" size={24} />
        </Text>
      </Pressable>
    </View>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    zIndex: 2,
    height: 50,
  },
  buttonContainer: {
    flex: 4,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 50,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
