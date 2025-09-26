import React from 'react';
import { StyleSheet, Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface WhiteTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const WhiteText = ({ children, style, ...props }: WhiteTextProps) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default WhiteText;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
