import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

const BUTTON_SIZE = 50

const FloatButtonScreen = () => {
  const _animationValue = new Animated.Value(0)
  let _isOpen = false

  const onPressHandler = () => {
    Animated.timing(_animationValue, {
      duration: 300,
      toValue: _isOpen ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()

    _isOpen = !_isOpen
  }

  const firstBtnStyle = {
    backgroundColor: 'red',
    transform: [
      { scale: _animationValue },
      {
        translateY: Animated.interpolate(_animationValue, {
          inputRange: [0, 1],
          outputRange: [0, -(BUTTON_SIZE + 5)],
        }),
      },
    ],
  }
  const secondBtnStyle = {
    backgroundColor: 'blue',
    transform: [
      { scale: _animationValue },
      {
        translateY: Animated.interpolate(_animationValue, {
          inputRange: [0, 1],
          outputRange: [0, -(BUTTON_SIZE + 5) * 2],
        }),
      },
    ],
  }
  const backgroundStyle = {
    transform: [
      {
        scale: Animated.interpolate(_animationValue, {
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
    ],
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.background, backgroundStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, firstBtnStyle]}>
          <Text style={styles.text}>#</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, secondBtnStyle]}>
          <Text style={styles.text}>@</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onPressHandler}>
        <Animated.View style={styles.button}>
          <Text style={styles.text}>$</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
  },
  button: {
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 3,
  },
  text: {
    color: '#fff',
  },
})

export default FloatButtonScreen
