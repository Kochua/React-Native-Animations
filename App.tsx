import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  ListScreen,
  FloatButtonScreen,
  WelcomeSliderScreen,
  ParallaxSliderScreen,
  FloatingHeartsScreen,
  ButtonProgressBarScreen,
} from './src/screens'

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate('List')}
        title="ListComponent"
      />
      <Button
        onPress={() => props.navigation.navigate('FloatButton')}
        title="Float Button"
      />

      <Button
        onPress={() => props.navigation.navigate('WelcomeSlider')}
        title="Animation Welcome Screen"
      />
      <Button
        onPress={() => props.navigation.navigate('ParallaxSlider')}
        title="Parallax Slider"
      />
      <Button
        onPress={() => props.navigation.navigate('FloatingHearts')}
        title="Floating Hearts "
      />
      <Button
        onPress={() => props.navigation.navigate('ButtonProgressBar')}
        title="Buttons with Progress Bar"
      />
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="FloatButton" component={FloatButtonScreen} />
        <Stack.Screen
          name="WelcomeSlider"
          component={WelcomeSliderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ParallaxSlider"
          component={ParallaxSliderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FloatingHearts"
          component={FloatingHeartsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ButtonProgressBar"
          component={ButtonProgressBarScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
