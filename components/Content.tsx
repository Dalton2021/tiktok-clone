import Post from '@/types/Post';
import User from '@/types/User';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, ListRenderItemInfo, StyleSheet, View, ViewToken } from 'react-native';
import postsData from '../data/postsData.json';
import usersData from '../data/usersData.json';
import ContentUI from './ContentUI';
import ContentVideo from './ContentVideo';

interface ContentProps {
  data: Post[];
}

const { height } = Dimensions.get('window');

const posts: Post[] = postsData;
const users: User[] = usersData;

type PostWithUser = Post & { user: User };

export default function Content({ data }: ContentProps) {
  const [currentItem, setCurrentItem] = useState<PostWithUser | null>(null);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const availableHeight = React.useMemo(() => height - bottomTabBarHeight, [bottomTabBarHeight]);

  const validPosts: PostWithUser[] = posts
    .map((post) => {
      const user = users.find((u) => u.id === post.user_id);
      return user ? { ...post, user } : null;
    })
    .filter((post): post is PostWithUser => post !== null);

  // keeps track of current/active item in flatList
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60, // % of item that must be visible
  });

  // keeps track of current/active item in flatList
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const firstVisible = viewableItems[0].item as PostWithUser;
      setCurrentItem(firstVisible);
    }
  });

  return (
    <View>
      <FlatList<PostWithUser>
        data={validPosts}
        keyExtractor={(item) => item.id}
        decelerationRate="fast"
        pagingEnabled // makes sure user can only scroll one item at a time
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<PostWithUser>) => (
          <ContentVideo
            source={item.video_url}
            height={availableHeight}
            active={item.id === currentItem?.id}
            style={[styles.contentView, { height: availableHeight }]}>
            <ContentUI post={item} />
          </ContentVideo>
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
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
