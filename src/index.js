import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { selectUserState } from './store/reducer/user';
const Index = () => {
  const { userName } = useSelector(selectUserState);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.userName}>
        <Text style={{ color: 'black' }}>Welcome, </Text>
        {userName}
      </Text>
    </SafeAreaView>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    fontSize: 20,
    color: '#17bd00'
  }
})