import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';

/*
TO-DO:
-------
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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragProgress, setDragProgress] = useState<number>(0);
  const progressBarRef = useRef<View>(null);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Track video progress and duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (player && active && !isDragging) {
        setCurrentTime(player.currentTime);
        if (player.duration) {
          setDuration(player.duration);
        }
      }
    }, 100); // Update every 100ms for smooth progress

    return () => clearInterval(interval);
  }, [player, active, isDragging]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, []);

  // Calculate progress (0 to 1 for react-native-paper)
  const progress = isDragging ? dragProgress / 100 : duration > 0 ? currentTime / duration : 0;

  // Handle seeking on progress bar
  const handleProgressBarPress = (event: any) => {
    const { locationX } = event.nativeEvent;

    event.target.measure((x: number, y: number, width: number) => {
      const percentage = locationX / width;
      const newTime = percentage * duration;
      player.currentTime = newTime;
    });
  };

  // Debounced seek function
  const debouncedSeek = useCallback(
    (time: number) => {
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
      seekTimeoutRef.current = setTimeout(() => {
        player.currentTime = time;
      }, 50); // 50ms debounce
    },
    [player]
  );

  // Handle pan gesture for seeking
  const handlePanGesture = (event: any) => {
    const { state, x } = event.nativeEvent;

    if (state === State.BEGAN) {
      setIsDragging(true);
    } else if (state === State.ACTIVE) {
      if (progressBarWidth > 0) {
        const percentage = Math.max(0, Math.min(100, (x / progressBarWidth) * 100));
        setDragProgress(percentage);

        // Debounced seek for smoother performance
        const newTime = (percentage / 100) * duration;
        debouncedSeek(newTime);
      }
    } else if (state === State.END || state === State.CANCELLED) {
      setIsDragging(false);
      // Final seek on gesture end
      if (progressBarWidth > 0) {
        const percentage = Math.max(0, Math.min(1, x / progressBarWidth));
        const newTime = percentage * duration;
        player.currentTime = newTime;
      }
    }
  };

  // Get progress bar width when component mounts or updates
  const onProgressBarLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setProgressBarWidth(width);
  };

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

      {/* Video Progress Bar using react-native-paper */}
      {active && (
        <PanGestureHandler
          onGestureEvent={handlePanGesture}
          onHandlerStateChange={handlePanGesture}
          shouldCancelWhenOutside={false}
          minPointers={1}
          maxPointers={1}>
          <View style={styles.progressBarContainer} ref={progressBarRef} onLayout={onProgressBarLayout}>
            <Pressable onPress={handleProgressBarPress}>
              <ProgressBar progress={progress} color="#fff" style={styles.progressBar} />
            </Pressable>
          </View>
        </PanGestureHandler>
      )}
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
    height: '50%',
    zIndex: 1,
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
  progressBarContainer: {
    position: 'absolute',
    bottom: -12, // Move container down to maintain visual position
    left: 0,
    right: 0,
    paddingHorizontal: 4,
    paddingVertical: 12, // Restore gesture area
    zIndex: 4,
  },
  progressBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
