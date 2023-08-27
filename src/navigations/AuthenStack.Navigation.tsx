import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/authen/Login';
import Register from '../screens/authen/Register';
import TabNavigation from '../screens/TabNavigation';
import ProductDetail from '../screens/products/ProductDetail';


const Stack = createStackNavigator();

export default function AuthenStackNavigation() {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="HomeNoAuthen"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeNoAuthen" component={TabNavigation} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
      );
}
