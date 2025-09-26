import Post from '@/types/Post';
import handleRenderTags from '@/utils/renderTags';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WhiteText from './ui/WhiteText';

interface ContentUIProps {
  post: Post;
}

const ContentUI = ({ post }: ContentUIProps) => {
  const user = post.user!; // Non-null assertion since Content includes user data

  return (
    <>
      <View style={styles.flexContainer}>
        <View style={styles.contentContainer}>
          <WhiteText style={styles.username}>{user.username}</WhiteText>
          <View>
            <WhiteText style={styles.contentText}>
              {post.caption} {handleRenderTags(post.tags) || ''}
            </WhiteText>
          </View>
        </View>
      </View>
      {/* sidebar */}
      {/* <View style={styles.interactiveContainer}>
        <Text style={styles.text}>ContentUI</Text>
      </View> */}
    </>
  );
};

export default ContentUI;

const styles = StyleSheet.create({
  interactiveContainer: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    padding: 10,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
    width: '80%',
    height: 90,
  },
  flexContainer: {
    flex: 1,
    position: 'relative',
  },
  username: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 10,
  },
  contentText: {
    color: '#eee',
  },
});
