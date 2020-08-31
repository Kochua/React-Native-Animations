import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'

const ButtonProgressBar = () => {
  const animation = new Animated.Value(0)
  const opacity = new Animated.Value(1)

  const onButtonPress = () => {
    animation.setValue(0)
    opacity.setValue(1)

    Animated.timing(animation, {
      duration: 1500,
      toValue: 1,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start()
      }
    })
  }

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(71,255,99)', 'rgb(99,71,255)'],
  })

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,
    opacity: opacity,
    backgroundColor: colorInterpolate,
  }

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onButtonPress}>
        <View
          style={{
            backgroundColor: '#e6537d',
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 60,
            paddingVertical: 10,
            overflow: 'hidden',
          }}
        >
          <Animated.View style={[StyleSheet.absoluteFill, progressStyle]} />
          <Text style={{ color: '#fff' }}>Click</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ButtonProgressBar
