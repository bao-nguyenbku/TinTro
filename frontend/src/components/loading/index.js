import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => 
  // TODO: Implement loading component here
   (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )


export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
