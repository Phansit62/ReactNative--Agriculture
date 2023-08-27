import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./stores/store";
import Main from "./Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    myFont: require("./assets/fonts/Pridi-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // Wait for fonts to load, show a loading screen or return null
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
