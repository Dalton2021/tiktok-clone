import Post from '@/types/Post';
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
          <WhiteText>{post.user_id}</WhiteText>
        </View>
      </View>
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
    // position: 'absolute',
    // left: 0,
    // right: 0,
    padding: 16,
    backgroundColor: '#524f4f73',
    width: '100%',
    height: 75,
    // marginBottom: 10,
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
