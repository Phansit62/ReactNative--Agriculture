import { View, Text } from "react-native";
import React, { useEffect } from "react";
import TabNavigator from "../navigations/Tab.Navigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function TabNavigation() {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <BottomSheetModalProvider>
        <TabNavigator />
      </BottomSheetModalProvider>
    </View>
  );
}
