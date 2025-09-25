import { router } from 'expo-router';
import { useRef } from 'react';
import { Animated, TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native';

export const AnimatedButton = ({ onPress }: TouchableWithoutFeedbackProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.25,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, 50);

    router.push('/create');
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <Animated.Image
        source={require('../../assets/images/addButton.png')}
        style={{
          width: '65%',
          height: '65%',
          transform: [{ scale: scaleAnim }],
        }}
      />
    </TouchableOpacity>
  );
};
