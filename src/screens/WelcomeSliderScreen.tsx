import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Dimensions,
  Animated,
} from 'react-native'

import image_big from '../../assets/welcome_image_big.png'
import image_small from '../../assets/welcome_image_small.png'
import image_msg from '../../assets/msg.png'

const { width, height } = Dimensions.get('window')

const WelcomeSliderScreen = () => {
  const animatedValue = new Animated.Value(0)

  const firstSliderStyles = {
    image_small: {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, width],
            outputRange: [0, -100],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  }

  const secondSliderStyle = {
    image_small: {
      opacity: animatedValue.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, width, width * 2],
            outputRange: [100, 0, -100],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
    msg: {
      opacity: animatedValue.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, width, width * 2],
            outputRange: [-100, 0, 100],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  }

  const thirdSliderStyles = {
    image1: {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [width, width * 2, width * 3],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
    image2: {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [width, width * 2, width * 3],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: animatedValue.interpolate({
            inputRange: [width, width * 2, width * 3],
            outputRange: ['-180deg', '0deg', '180deg'],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
  }

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: animatedValue } },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.item_wrapper}>
          <View style={styles.item_header}>
            <Animated.Image
              source={image_big}
              resizeMode="contain"
              style={{
                width: 320,
                height: 180,
              }}
            />
            <Animated.Image
              source={image_small}
              resizeMode="contain"
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(70),
                  height: PixelRatio.getPixelSizeForLayoutSize(62),
                  position: 'absolute',
                  top: 270,
                  left: 60,
                },
                firstSliderStyles.image_small,
              ]}
            />
            <Animated.Image
              source={image_msg}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(25),
                height: PixelRatio.getPixelSizeForLayoutSize(21),
                position: 'absolute',
                top: 240,
                left: 80,
              }}
            />
          </View>

          <Text style={styles.item_content}>
            Image and Content 1 X: {animatedValue._value}
          </Text>
        </View>

        <View style={styles.item_wrapper}>
          <View style={styles.item_header}>
            <Animated.Image
              source={image_big}
              resizeMode="contain"
              style={{
                width: 320,
                height: 180,
              }}
            />
            <Animated.Image
              source={image_small}
              resizeMode="contain"
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(70),
                  height: PixelRatio.getPixelSizeForLayoutSize(62),
                  position: 'absolute',
                  top: 270,
                  left: 60,
                },
                secondSliderStyle.image_small,
              ]}
            />
            <Animated.Image
              source={image_msg}
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(25),
                  height: PixelRatio.getPixelSizeForLayoutSize(21),
                  position: 'absolute',
                  top: 240,
                  left: 80,
                },
                secondSliderStyle.msg,
              ]}
            />
          </View>

          <Text style={styles.item_content}>Image and Content 2</Text>
        </View>

        <View style={styles.item_wrapper}>
          <View style={styles.item_header}>
            <Animated.Image
              source={image_big}
              resizeMode="contain"
              style={[
                {
                  width: 320,
                  height: 180,
                },
                thirdSliderStyles.image1,
              ]}
            />
            <Animated.Image
              source={image_small}
              resizeMode="contain"
              style={[
                {
                  width: PixelRatio.getPixelSizeForLayoutSize(70),
                  height: PixelRatio.getPixelSizeForLayoutSize(62),
                  position: 'absolute',
                  top: 270,
                  left: 60,
                },
                thirdSliderStyles.image2,
              ]}
            />
            <Animated.Image
              source={image_msg}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(25),
                height: PixelRatio.getPixelSizeForLayoutSize(21),
                position: 'absolute',
                top: 240,
                left: 80,
              }}
            />
          </View>

          <Text style={styles.item_content}>Image and Content 3</Text>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  item_wrapper: {
    flex: 1,
    width: width,
    backgroundColor: '#F89E20',
  },
  item_header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_content: {
    flex: 1,
  },
})

export default WelcomeSliderScreen
