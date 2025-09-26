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

const posts: Post[] = postsData;
const users: User[] = usersData;

export default function Content({ data }: ContentProps) {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const availableHeight = React.useMemo(() => height - bottomTabBarHeight, [bottomTabBarHeight]);

  const validPosts = posts
    .map((post) => {
      const user = users.find((u) => u.id === post.user_id);
      return user ? { ...post, user } : null;
    })
    .filter((post): post is Post & { user: User } => post !== null);

  return (
    <View>
      <FlatList
        data={validPosts}
        keyExtractor={(item) => item.id}
        // snapToInterval={availableHeight}
        // snapToAlignment="start"
        decelerationRate={'fast'}
        pagingEnabled // makes sure user can only scroll one item at a time.
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.contentView, { height: availableHeight }]}>
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
    borderBottomColor: '#3b3b3bbe',
  },
  text: {
    color: '#fff',
  },
});
