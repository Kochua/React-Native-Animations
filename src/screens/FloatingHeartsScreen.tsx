import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native'

const { width, height } = Dimensions.get('window')
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const FloatingHeartsScreen = () => {
  const [hearts, setHearts] = React.useState([])

  const onHeartAdd = () => {
    const animatedValue = new Animated.Value(height - 50)
    const newHearts = [
      ...hearts,
      { animatedValue, start: getRandomInt(100, width - 100) },
    ]

    setHearts(newHearts)

    Animated.timing(animatedValue, {
      toValue: -height,
      duration: 4000,
      useNativeDriver: true,
    }).start()
  }

  const dividedHeight = height / 6 // 6 ნაწილად ვყოფთ რომ 6 მოქმედება გავაკეტებინოთ ჰაერში

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onHeartAdd}>
        <View style={StyleSheet.absoluteFill}>
          {hearts.map(({ animatedValue, start }: any, i) => {
            const scaleInterpolate = animatedValue.interpolate({
              inputRange: [0, 15, 30],
              outputRange: [0, 1.2, 1],
              extrapolate: 'clamp',
            })

            const translateXInterpolate = animatedValue.interpolate({
              inputRange: [
                0,
                dividedHeight,
                dividedHeight * 2,
                dividedHeight * 3,
                dividedHeight * 4,
                dividedHeight * 5,
                dividedHeight * 6,
              ],
              outputRange: [0, 15, -15, 15, -15, 15, -15],
              extrapolate: 'clamp',
            })

            const heartStyle = {
              left: start,
              opacity: animatedValue.interpolate({
                inputRange: [0, height - 200],
                outputRange: [1, 1],
                extrapolate: 'clamp',
              }),
              transform: [
                { scale: scaleInterpolate },
                {
                  translateY: animatedValue,
                },
                {
                  translateX: translateXInterpolate,
                },
              ],
            }
            return <Heart key={i} style={heartStyle} />
          })}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const Heart = ({ style }) => (
  <Animated.View style={[styles.heart, style]}>
    <View style={[styles.heartShape, styles.leftHeart]} />
    <View style={[styles.heartShape, styles.rightHeart]} />
  </Animated.View>
)

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  heart: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [{ rotate: '-45deg' }],
    left: 5,
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
    right: 5,
  },
})

export default FloatingHeartsScreen
