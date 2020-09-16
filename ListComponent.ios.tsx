import 'react-native-gesture-handler';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const componentHeight = 140;

const ListComponent = ({avatar, color, scrollToY, getScroll}) => {
  const initialValue = useSharedValue(0);
  const y = useSharedValue(componentHeight);
  const initialScroll = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      initialScroll.value = -1;
    },
    onActive: (event, ctx) => {},
    onEnd: (event, ctx) => {},
  });

  const menuStyle = useAnimatedStyle(() => {
    return {
      height: y.value,
    };
  });

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            width: '100%',
            marginVertical: 30,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          menuStyle,
        ]}>
        <AutoHeightWebView
          incognito={true}
          onSizeUpdated={(size) => {
            initialValue.value = size.height;
            y.value = size.height;
          }}
          onScroll={(event) => {
            if (y.value !== initialValue.value * event.nativeEvent.zoomScale) {
              y.value = initialValue.value * event.nativeEvent.zoomScale;
              if (initialScroll.value === -1) {
                initialScroll.value = getScroll();
              } else {
                scrollToY(
                  initialScroll.value +
                    (initialValue.value * (event.nativeEvent.zoomScale - 1)) /
                      2,
                );
              }
            }
          }}
          source={{
            uri: 'https://wojtus7.github.io',
          }}
          style={{width: 370}}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ListComponent;
