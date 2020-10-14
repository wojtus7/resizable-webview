import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {StyleSheet, ScrollView, Dimensions, View} from 'react-native';

import ListComponent from './ListComponent';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ListExpander = () => {
  const scrollRef = useRef(null);
  const [enabled, setEnabled] = useState(true);
  let scroll = useRef({scroll: 0});

  const scrollToY = (y) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({y, animated: false});
    }
  };

  const getScroll = () => {
    return scroll.current.scroll;
  };

  return (
    <ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      pinchGestureEnabled={false}
      canCancelContentTouches={false}
      onScroll={(event) => {
        scroll.current.scroll = event.nativeEvent.contentOffset.y;
      }}
      style={{
        height: deviceHeight,
        width: deviceWidth,
      }}>
      <View
        style={[
          {
            position: 'absolute',
          },
        ]}></View>

      {things.map((thing, index) => {
        return (
          <ListComponent
            key={`${index}`}
            aaaKey={`${index}`}
            scrollToY={scrollToY}
            scroll={scroll}
            {...thing}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
});

const things = [
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'green',
  },
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'yellow',
  },
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'blue',
  },
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'gray',
  },
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'white',
  },
  {
    text: 'asdasd',
    avatar: '🙈',
    name: 'Somebody Nobody',
    color: 'red',
  },
];

export default ListExpander;
