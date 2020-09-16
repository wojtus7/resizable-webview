import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  Easing,
  withSpring,
} from 'react-native-reanimated';
import {WebView} from 'react-native-webview';

const componentHeight = 150;

const ListComponent = ({avatar, color}) => {
  const duringInteraction = useSharedValue(false);
  const scale = useSharedValue(1);
  const y = useSharedValue(componentHeight);
  const transX = useSharedValue(0);

  let [info, setInfo] = useState('');
  let androidInitialHeight = 0;

  const menuStyle = useAnimatedStyle(() => {
    return {
      height: y.value,
    };
  });

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateX: transX.value},
        {scale: y.value / componentHeight},
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          margin: 30,
          width: 300,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        menuStyle,
      ]}>
      <Animated.View>
        <WebView
          scrollEnabled={false}
          onScroll={(event) => {
            console.log(
              event.nativeEvent.contentSize.width -
                event.nativeEvent.contentOffset.y,
            );
            if (androidInitialHeight) {
              y.value =
                componentHeight *
                ((event.nativeEvent.contentSize.width -
                  event.nativeEvent.contentOffset.y) /
                  androidInitialHeight);
            } else {
              androidInitialHeight = event.nativeEvent.contentSize.width;
            }
          }}
          source={{
            uri: 'https://wojtus7.github.io',
          }}
          style={{height: 200, width: 300}}
          scalesPageToFit={false}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListComponent;
