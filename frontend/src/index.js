
import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import LoginScreen from 'screens/logIn';

function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    color: '#17bd00',
  },
});
