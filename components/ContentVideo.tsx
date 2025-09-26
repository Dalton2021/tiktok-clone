import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, Animated } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';

interface ContentVideoProps {
  source: string;
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
  height: number;
  active: boolean;
}

// handles mapping to assets/videos
const allVideos = require.context('../assets/videos', false, /\.mp4$/);

// video map
const videoAssets: { [key: string]: any } = {};
allVideos.keys().forEach((key: string) => {
  const fileName = key.replace('./', '');
  videoAssets[fileName] = allVideos(key);
});

const ContentVideo = ({ source, style, children, height, active }: ContentVideoProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(active);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Use Animated.Value for smooth drag progress
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [displayProgress, setDisplayProgress] = useState<number>(0);

  const progressBarRef = useRef<View>(null);
  const rafId = useRef<number | null>(null);
  const lastSeekTime = useRef<number>(0);
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

  // Track video progress and duration with smooth updates
  useEffect(() => {
    const updateProgress = () => {
      if (player && active && !isDragging) {
        const time = player.currentTime;
        const dur = player.duration || 0;

        setCurrentTime(time);
        setDuration(dur);

        if (dur > 0) {
          const progress = time / dur;
          // Animate to new progress for smoother visual
          Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false,
          }).start();
          setDisplayProgress(progress);
        }
      }
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [player, active, isDragging, animatedProgress]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Calculate progress for display
  const progress = isDragging ? displayProgress : displayProgress;

  // Handle direct tap on progress bar
  const handleProgressBarPress = (event: any) => {
    if (isDragging) return; // Ignore taps while dragging

    const { locationX } = event.nativeEvent;
    event.target.measure((x: number, y: number, width: number) => {
      const percentage = Math.max(0, Math.min(1, locationX / width));
      const newTime = percentage * duration;
      player.currentTime = newTime;
      setDisplayProgress(percentage);

      // Animate to new position
      Animated.timing(animatedProgress, {
        toValue: percentage,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  // Throttled seek with RAF for smooth updates
  const seekToPosition = useCallback((percentage: number) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const now = Date.now();
      // Throttle actual seeks to every 50ms
      if (now - lastSeekTime.current > 50) {
        const newTime = percentage * duration;
        player.currentTime = newTime;
        lastSeekTime.current = now;
      }
      rafId.current = null;
    });
  }, [player, duration]);

  // Improved pan gesture handler
  const handlePanGesture = useCallback((event: any) => {
    const { state, x, translationX, velocityX } = event.nativeEvent;

    if (state === State.BEGAN) {
      setIsDragging(true);
      // Pause the player while dragging for better performance
      if (isPlaying) {
        player.pause();
      }
    } else if (state === State.ACTIVE) {
      if (progressBarWidth > 0) {
        // Use absolute position for more accurate tracking
        const percentage = Math.max(0, Math.min(1, x / progressBarWidth));

        // Update visual immediately for responsiveness
        setDisplayProgress(percentage);

        // Use native driver for smoother animation
        animatedProgress.setValue(percentage);

        // Throttled seek to video position
        seekToPosition(percentage);
      }
    } else if (state === State.END || state === State.CANCELLED) {
      // Apply velocity for momentum (optional)
      if (progressBarWidth > 0) {
        let finalPercentage = Math.max(0, Math.min(1, x / progressBarWidth));

        // Add subtle momentum based on velocity
        if (Math.abs(velocityX) > 100) {
          const momentum = velocityX / progressBarWidth * 0.05; // Subtle momentum
          finalPercentage = Math.max(0, Math.min(1, finalPercentage + momentum));
        }

        const newTime = finalPercentage * duration;
        player.currentTime = newTime;
        setDisplayProgress(finalPercentage);

        // Smooth animation to final position
        Animated.timing(animatedProgress, {
          toValue: finalPercentage,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }

      setIsDragging(false);

      // Resume playback if it was playing before
      if (isPlaying) {
        setTimeout(() => player.play(), 100);
      }
    }
  }, [progressBarWidth, duration, player, isPlaying, animatedProgress, seekToPosition]);

  // Get progress bar width when component mounts or updates
  const onProgressBarLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setProgressBarWidth(width);
  };

  return (
    <GestureHandlerRootView style={[style, { height, position: 'relative' }]}>
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

      {/* Shadow/Vignette overlay */}
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

      {/* Video Progress Bar with smooth dragging */}
      {active && (
        <PanGestureHandler
          onGestureEvent={handlePanGesture}
          onHandlerStateChange={handlePanGesture}
          shouldCancelWhenOutside={false}
          minPointers={1}
          maxPointers={1}
          hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}>
          <View
            style={styles.progressBarContainer}
            ref={progressBarRef}
            onLayout={onProgressBarLayout}>
            <Pressable
              onPress={handleProgressBarPress}
              style={styles.progressBarPressable}>
              <ProgressBar
                progress={progress}
                color={isDragging ? "#fff" : "#eeeeee6e"}
                style={[
                  styles.progressBar,
                  isDragging && styles.progressBarDragging
                ]}
              />
              {isDragging && (
                <Animated.View
                  style={[
                    styles.progressThumb,
                    {
                      left: animatedProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      })
                    }
                  ]}>
                  <View style={styles.thumbIcon} />
                </Animated.View>
              )}
            </Pressable>
          </View>
        </PanGestureHandler>
      )}
    </GestureHandlerRootView>
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
    bottom: -12,
    left: 0,
    right: 0,
    paddingVertical: 12,
    zIndex: 4,
  },
  progressBarPressable: {
    // Add extra touch area for easier interaction
    paddingVertical: 8,
    marginVertical: -8,
  },
  progressBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(206, 206, 206, 0.3)',
  },
  progressBarDragging: {
    height: 4, // Slightly larger when dragging for visual feedback
  },
  progressThumb: {
    position: 'absolute',
    top: 0, // Adjusted since we're inside the pressable now
    marginLeft: -10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});