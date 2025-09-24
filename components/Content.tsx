import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

interface ContentItem {
  id: string;
  title: string;
}

interface ContentProps {
  data: ContentItem[];
}

const { height } = Dimensions.get('window');
function getRandomHex(): string {
  // Generate RGB values in the lighter range (e.g., 128–255)
  const r = Math.floor(128 + Math.random() * 128);
  const g = Math.floor(128 + Math.random() * 128);
  const b = Math.floor(128 + Math.random() * 128);

  // Convert to hex and return
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export default function Content({ data }: ContentProps) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.ContentView, { backgroundColor: getRandomHex() }]}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ContentView: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getRandomHex(),
    borderBottomWidth: 1,
    borderBottomColor: '#3b3b3b96',
  },
});
