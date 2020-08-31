import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native'

const { width, height } = Dimensions.get('window')
import food1 from '../../../assets/food1.png'
import food2 from '../../../assets/food2.jpg'
import food3 from '../../../assets/food3.jpeg'
import food4 from '../../../assets/food4.png'

const Images = [
  { image: food1, title: 'Vokda Cran' },
  { image: food2, title: 'Old Fashion' },
  { image: food3, title: 'Mule' },
  { image: food4, title: 'Strawberry Daiquiri' },
]

const ParallaxItem = ({ image, title, animationImageStyles }) => {
  return (
    <View style={styles.item_wrapper}>
      <Animated.Image
        source={image}
        style={[styles.item_image, animationImageStyles]}
        resizeMode="cover"
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <View style={styles.item_text_wrapper}>
          <Text style={styles.item_text}>{title}</Text>
        </View>
      </View>
    </View>
  )
}

const ParallaxSliderScreen = () => {
  const animatedValue = new Animated.Value(0)

  const getInterpolateStyle = (animValue, i) => {
    const inputRange =
      i === 0
        ? [0, width, width * 2]
        : [width * i, width * i * 2, width * i * 3]

    return {
      transform: [
        {
          translateX: animValue.interpolate({
            inputRange,
            outputRange: [0, 100, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    }
  }

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedValue } } }],
          { useNativeDriver: true }
        )}
      >
        {Images.map((image, i) => {
          return (
            <ParallaxItem
              key={i}
              {...image}
              animationImageStyles={getInterpolateStyle(animatedValue, i)}
            />
          )
        })}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  item_wrapper: {
    height,
    width,
  },
  item_image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  item_text_wrapper: {
    width,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    color: '#fff',
    fontSize: 30,
  },
})

export default ParallaxSliderScreen
