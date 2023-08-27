import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainHome from "../screens/home/MainHome";
import { fetchData } from "../authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import colors from "../helpers/colors";
import Products from "../screens/products/ShowProducts";
import MainSetting from "../screens/settings/MainSetting";
import { MaterialIcons } from "@expo/vector-icons";
import ShoppingCart from "../screens/account/ShoppingCart";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const userData = useSelector(fetchData);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ffff",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: colors.green,
          height: 75,
        },
        tabBarLabelStyle: {
          fontFamily: "myFont",
          fontSize: 15,
          bottom: 14,
        },
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Home") {
            return <MaterialIcons name="home" size={28} color={color} />;
          } else if (route.name === "Products") {
            return <MaterialIcons name="store" size={28} color={color} />;
          } else if (route.name === "MainSetting") {
            return <MaterialIcons name="settings" size={28} color={color} />;
          }else if(route.name === "Cart") {
            return <MaterialIcons name="shopping-cart" size={28} color={color} /> 
          }
        },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name={"Home"} options={{ tabBarLabel: "หน้าหลัก" }} children={() => <MainHome user={userData} />} />
      <Tab.Screen name="Products" options={{ tabBarLabel: "สินค้าทั้งหมด" }} component={Products} />
      <Tab.Screen name="Cart" options={{ tabBarLabel: "ตะกร้า" }} component={ShoppingCart} />
      <Tab.Screen name="MainSetting" options={{ tabBarLabel: "ตั้งค่า" }} component={MainSetting} />
    </Tab.Navigator>
  );
}
