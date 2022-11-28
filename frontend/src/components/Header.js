import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';

const Header = ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12
  },
  headerTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20
  }
})