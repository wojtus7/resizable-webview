import 'react-native-gesture-handler';
import React, {useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AutoHeightWebView from 'react-native-autoheight-webview';

const ListComponent = ({avatar, color, scrollToY, scroll, aaaKey}) => {
  const initialValue = useSharedValue(0);
  const initialWidth = useSharedValue(0);
  const y = useSharedValue(0);

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
        style={[styles.container, {backgroundColor: color}, menuStyle]}>
        <AutoHeightWebView
          scrollEnabled={false}
          showHorizontalScrollIndicator={false}
          onSizeUpdated={(size) => {
            initialValue.value = size.height;
            initialWidth.value = size.width;
            y.value = size.height;
            webViewState.current = {
              scroll: scroll.current.scroll,
              height: size.height,
            };
          }}
          onScroll={(event) => {
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default ListComponent;
