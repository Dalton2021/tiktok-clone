import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

/*
TO-DO:
-------
 - pause icon
 - video bar
 - videos with sound?
 - play/pause restart on each scroll of flat list item
 - videos are all playing underneath each other, only the active scroll needs to be playing. probably need a focused state or something from flat list.

*/

interface ContentVideoProps {
  source: string;
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
  height: number;
  active: boolean;
}

// handles mapping to assets/videos. Is this too large a variable?
const allVideos = require.context('../assets/videos', false, /\.mp4$/);

// video map
const videoAssets: { [key: string]: any } = {};
allVideos.keys().forEach((key: string) => {
  const fileName = key.replace('./', ''); // Remove './' prefix
  videoAssets[fileName] = allVideos(key);
});

const ContentVideo = ({ source, style, children, height, active }: ContentVideoProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(active);

  const videoSource = videoAssets[source];

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying, player]);

  // Control playback based on active prop
  useEffect(() => {
    if (active) {
      player.play();
      setIsPlaying(true);
    } else {
      player.currentTime = 0;
      player.pause();
      setIsPlaying(false);
    }
  }, [active, player]);

  return (
    <View style={[style, { height, position: 'relative' }]}>
      {/* Video layer - absolute positioned behind everything */}
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          nativeControls={false}
        />
      </View>

      {/* Tap overlay - covers entire area for pause/play */}
      <Pressable onPress={togglePlayback} style={styles.tapOverlay} />

      {/* UI layer - floats on top */}
      <View style={styles.uiContainer} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
};

export default ContentVideo;

const styles = StyleSheet.create({
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    width: '100%',
    height: '100%',
    aspectRatio: '9 / 16',
  },
  tapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  uiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});
