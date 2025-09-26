import Post from '@/types/Post';
import formatCompactNumber from '@/utils/compactNumber';
import handleRenderTags from '@/utils/renderTags';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import WhiteText from './ui/WhiteText';

/*
TO-DO:
-------
 - modals for comments.

*/

interface ContentUIProps {
  post: Post;
}

const ContentUI = ({ post }: ContentUIProps) => {
  const user = post.user!; // Non-null assertion since Content includes user data

  return (
    <>
      {/* Content */}
      <View style={styles.flexContainer}>
        <View style={styles.flexRow}>
          <View style={styles.contentCol}>
            <View style={styles.contentContainer}>
              <WhiteText style={styles.username}>{user.username}</WhiteText>
              <View>
                <WhiteText style={styles.contentText}>
                  {post.caption}{' '}
                  <WhiteText style={styles.contentTags}>{handleRenderTags(post.tags) || ''}</WhiteText>
                </WhiteText>
              </View>
            </View>
          </View>
          <View style={styles.activityCol}>
            <View style={styles.activityContainer}>
              <View style={[styles.activityPressableContainer, styles.userIconContainer]}>
                <Image source={{ uri: `${user.icon}` }} style={styles.userIcon} />
                <WhiteText style={styles.followButton}>+</WhiteText>
              </View>
              <View style={styles.activityPressableContainer}>
                <WhiteText>
                  <AntDesign name="heart" size={28} style={{ borderWidth: 3, borderColor: '#000' }} />
                </WhiteText>
                <WhiteText style={styles.activityPressableText}>{formatCompactNumber(post.likes)}</WhiteText>
              </View>
              <View style={styles.activityPressableContainer}>
                <View>
                  <Ionicons name="chatbubble-ellipses" size={30} style={styles.flippedIcon} />
                </View>
                <WhiteText style={styles.activityPressableText}>
                  {formatCompactNumber(post.comments)}
                </WhiteText>
              </View>
              <View style={styles.activityPressableContainer}>
                <WhiteText>
                  <Octicons name="bookmark-filled" size={30} />
                </WhiteText>
                <WhiteText style={styles.activityPressableText}>{formatCompactNumber(post.saves)}</WhiteText>
              </View>
              <View style={styles.activityPressableContainer}>
                <WhiteText>
                  <FontAwesome6 name="share" size={30} />
                </WhiteText>
                <WhiteText style={styles.activityPressableText}>{formatCompactNumber(post.shares)}</WhiteText>
              </View>
              <View style={styles.activityPressableContainer}>
                <View>
                  <Image source={{ uri: `${user.icon}` }} style={styles.soundIcon} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ContentUI;

const styles = StyleSheet.create({
  interactiveContainer: {
    width: '20%',
    backgroundColor: '#e4a0a0ff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
  },
  username: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#eee',
  },
  contentTags: {
    fontWeight: '600',
    color: '#eee',
  },
  contentCol: {
    flex: 0.85,
  },
  activityCol: {
    flex: 0.15,
  },
  activityContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userIcon: {
    width: 42,
    height: 42,
    borderRadius: 21.5,
  },
  soundIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  activityPressableContainer: {
    paddingVertical: 9,
  },
  activityPressableText: {
    paddingTop: 3,
    textAlign: 'center',
  },
  flippedIcon: {
    transform: [{ scaleX: -1 }],
    color: '#fff',
  },
  followButton: {
    position: 'absolute',
    bottom: 2, // Adjust this to control overlap
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#ff3c66ff',
    borderRadius: 100,
    fontSize: 22,
    width: 22,
    height: 22,
    lineHeight: 22,
  },
  userIconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
});
