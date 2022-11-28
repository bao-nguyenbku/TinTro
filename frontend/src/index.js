import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import LoginNav from './navigations/LoginNav';

function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginNav />
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
});
