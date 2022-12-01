import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const AccommodationDetailsScreen = (props) => {
  const { navigation } = props;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);
  return (
    <View>
      <Text>AccommodationDetailsScreen</Text>
    </View>
  )
}

export default AccommodationDetailsScreen

const styles = StyleSheet.create({})