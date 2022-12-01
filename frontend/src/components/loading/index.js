import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Box } from "native-base";
const Loading = () => (
  <Box
    flex={1}
    justifyContent='center'
    flexDirection='row'
    padding='10px'
  >
    <ActivityIndicator size="large" color="#059669" />
  </Box>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading;