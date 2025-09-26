import Post from '@/types/Post';
import User from '@/types/User';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import postsData from '../data/postsData.json';
import usersData from '../data/usersData.json';
import ContentUI from './ContentUI';

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
  const r = Math.floor(50 + Math.random() * 128);
  const g = Math.floor(30 + Math.random() * 128);
  const b = Math.floor(80 + Math.random() * 128);

  // Convert to hex and return
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

const posts: Post[] = postsData;
const users: User[] = usersData;

export default function Content({ data }: ContentProps) {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const availableHeight = height - bottomTabBarHeight;

  // Filter posts and include user data (EF Core Include equivalent)
  const validPosts = posts
    .map(post => {
      const user = users.find(u => u.id === post.user_id);
      return user ? { ...post, user } : null;
    })
    .filter((post): post is Post & { user: User } => post !== null);

  return (
    <View>
      <FlatList
        data={validPosts}
        keyExtractor={(item) => item.id}
        snapToInterval={availableHeight}
        snapToAlignment="start"
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.contentView, { backgroundColor: getRandomHex(), height: availableHeight }]}>
            <ContentUI post={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    borderBottomWidth: 1,
    borderBottomColor: '#3b3b3b96',
  },
  text: {
    color: '#fff',
  },
});
