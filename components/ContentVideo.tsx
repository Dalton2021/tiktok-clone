import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

/*
TO-DO:
-------
 - video bar
 - pull to refresh -> add this to hitting the home button too
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

      {/* Shadow/Vignette overlay - lets the text display a hair better */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.44)']}
        style={styles.shadowOverlay}
        pointerEvents="none"
      />

      {/* Tap overlay - covers entire area for pause/play */}
      <Pressable onPress={togglePlayback} style={styles.tapOverlay} />

      {/* UI layer - floats on top */}
      <View style={styles.uiContainer} pointerEvents="box-none">
        {active && !isPlaying && (
          <View style={styles.pauseContainer}>
            <Text style={styles.pauseIcon}>
              <FontAwesome5 name="play" size={60} />
            </Text>
          </View>
        )}
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
  shadowOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%', // Covers bottom half with gradient
    zIndex: 1, // Changed from 0.5 to 1
  },
  tapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  uiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  pauseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIcon: {
    color: '#eeeeee65',
  },
});
