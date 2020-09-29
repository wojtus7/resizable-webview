import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
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

const ListComponent = ({
  avatar,
  color,
  scrollToY,
  getScroll,
  setScrollEnabled,
}) => {
  const initialValue = useSharedValue(0);
  const initialWidth = useSharedValue(0);
  const y = useSharedValue(0);
  const initialScroll = useSharedValue(0);
  const initialOffset = useSharedValue(0);

  const eventsCount = useRef({
    number: 0,
  });

  const incrementEventsCount = () => {
    if (eventsCount.current.number === 0) {
      setScrollEnabled(false);
    }
    eventsCount.current.number = eventsCount.current.number + 1;
  };

  const decrementEventsCount = () => {
    console.log(eventsCount.current.number);
    eventsCount.current.number = eventsCount.current.number - 1;
    if (eventsCount.current.number === 0) {
      setScrollEnabled(true);
    }
  };

  const menuStyle = useAnimatedStyle(() => {
    return {
      height: y.value,
    };
  });

  const View = useMemo(
    () => (
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
          scrollEnabled={false}
          showHorizontalScrollIndicator={false}
          onSizeUpdated={(size) => {
            initialValue.value = size.height;
            initialWidth.value = size.width;
            y.value = size.height;
          }}
          onScroll={(event) => {
            // setTimeout(() => {
            incrementEventsCount();
            // }, 0);
            setTimeout(() => {
              decrementEventsCount();
            }, 200);
            y.value =
              initialValue.value *
              (event.nativeEvent.contentSize.width / initialWidth.value);
            scrollToY(initialScroll.value + y.value / 2 - initialOffset.value);
          }}
          source={{
            uri: 'https://wojtus7.github.io',
          }}
          style={{width: 370}}
        />
      </Animated.View>
    ),
    [],
  );

  return View;
};

export default ListComponent;
