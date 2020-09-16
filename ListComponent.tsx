import 'react-native-gesture-handler';
import React from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {WebView} from 'react-native-webview';

const componentHeight = 140;

const ListComponent = ({avatar, color}) => {
  const y = useSharedValue(componentHeight);

  const menuStyle = useAnimatedStyle(() => {
    return {
      height: y.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 300,
          margin: 30,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        menuStyle,
      ]}>
      <Animated.View>
        <WebView
          source={{uri: 'https://www.euro.com.pl'}}
          style={{height: 200, width: 300}}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListComponent;
