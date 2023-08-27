import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainHome from "../screens/home/MainHome";
import Products from "../screens/products/ShowProducts";
import Login from "../screens/authen/Login";
import Register from "../screens/authen/Register";
import MainSetting from "../screens/settings/MainSetting";
import ProfileSettings from "../screens/account/ProfileSetting";
import UsageHistory from "../screens/usage-history/UsageHistory";
import Coupon from "../screens/account/Coupon";
import CouponList from "../screens/copon/Coupon";
import ContactUs from "../screens/contact-us/ContactUs";
import AddressSetting from "../screens/account/address/AddressSetting";
import FormAddress from "../screens/account/address/FormAddress";
import TabNavigation from "../screens/TabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, onStorage } from "../authentication/authSlice";
import ProductDetail from "../screens/products/ProductDetail";
import Checkout from "../screens/orders/CheckOut";
import HistoryOrder from "../screens/account/HistoryOrder";
import OrderDetail from "../screens/orders/OrderDetail";
import FormReview from "../screens/reviews/FormReview";
import Dashboard from "../screensAdmin/home/Dashboard";

export default function StackNavigation() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch<any>();
  const user = useSelector(fetchData);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Tab"
      screenListeners={(e) => {
        dispatch(onStorage());
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigation} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="UsageHistory" component={UsageHistory} />
      <Stack.Screen name="HistoryOrder" component={HistoryOrder} />
      <Stack.Screen name="Coupon" component={Coupon} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="AddressSetting" component={AddressSetting} />
      <Stack.Screen name="FormAddress" component={FormAddress} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Review" component={FormReview} />
      <Stack.Screen name="CouponList" component={CouponList} />
    </Stack.Navigator>
  );
}
