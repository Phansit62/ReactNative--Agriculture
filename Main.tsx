import React, { useEffect } from "react";
import store from "./stores/store";
import StackNavigation from "./src/navigations/Stack.Navigation";
import AuthenStackNavigation from "./src/navigations/AuthenStack.Navigation";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { fetchData, onStorage } from "./src/authentication/authSlice";
import { useSelector, useDispatch } from "react-redux";
import StackAdminNavigation from "./src/navigations/StackAdmin.Navigation";

export default function Main() {
  const user = useSelector(fetchData);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onStorage());
  }, []);

  return (
    <NavigationContainer>{user.isLogin ? user.role === 2 ? <StackAdminNavigation /> : <StackNavigation /> : <AuthenStackNavigation />}</NavigationContainer>
  );
}
