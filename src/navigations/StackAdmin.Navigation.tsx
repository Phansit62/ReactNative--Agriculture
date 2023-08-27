import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screensAdmin/home/Dashboard";
import { useSelector } from "react-redux";
import { fetchData } from "../authentication/authSlice";
import Income from "../screensAdmin/report-detail/Income";

export default function StackAdminNavigation() {
  const Stack = createStackNavigator();
  const user = useSelector(fetchData);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen name="Dashboard" children={() => <Dashboard user={user} />} />
      <Stack.Screen name="Income" component={Income} />
    </Stack.Navigator>
  );
}
