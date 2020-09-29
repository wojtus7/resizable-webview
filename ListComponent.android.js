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
  scroll,
  setScrollEnabled,
  aaaKey,
}) => {
  const initialValue = useSharedValue(0);
  const initialWidth = useSharedValue(0);
  const initialScroll = useSharedValue(0);
  const currentKey = useSharedValue(aaaKey);
  const y = useSharedValue(0);

  const eventsCount = useRef({
    number: 0,
  });

  const incrementEventsCount = () => {
    if (eventsCount.current.number === 0) {
      setScrollEnabled(false);
      if (!currentKey.value === aaaKey) {
        initialScroll.value = scroll.current.scroll;
        currentKey.value = aaaKey;
      }
    }
    eventsCount.current.number = eventsCount.current.number + 1;
  };

  const decrementEventsCount = () => {
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

  const webViewState = useRef({
    height: 0,
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
            // initialScroll.value = scroll.current.getScroll();
            y.value = size.height;
            webViewState.current = {
              scroll: scroll.current.scroll,
              height: size.height,
            };
          }}
          onScroll={(event) => {
            incrementEventsCount();
            setTimeout(() => {
              decrementEventsCount();
            }, 200);
            const webViewHeightToSet =
              initialValue.value *
              (event.nativeEvent.contentSize.width / initialWidth.value);
            const scrollToSet =
              scroll.current.scroll -
              (y.value - webViewState.current.height) / 2;
            console.log(webViewHeightToSet, scrollToSet);
            y.value = webViewHeightToSet;
            scrollToY(scrollToSet);
            webViewState.current = {
              height: webViewHeightToSet,
            };
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
