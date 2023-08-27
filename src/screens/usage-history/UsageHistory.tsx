import React, { useState , useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Buttons } from "../../components/Buttons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HistoryCoupon from "./HistoryCoupon";
import HistoryTransferPoint from "./HistoryTransferPoint";
import { useSelector } from "react-redux";
import { fetchData } from "../../authentication/authSlice";
import { getHistoryCouponList } from "../../../services/Coupon.Service";
import { getHistoryTransferList } from "../../../services/TransferPoint.Service";

const Tab = createMaterialTopTabNavigator();

export type Coupon = {
  name:string;
  points:number;
  createdAt:Date;
}

export type TransferPoint = {
  nameUser:string;
  nameToUser:string;
  createdAt:Date;
}

export default function UsageHistory({ navigation }: any) {
  const [active, setActive] = useState(1);
  const [coupon , setCoupon] = useState<Coupon[]>();
  const [transfer,setTransfer] = useState<TransferPoint[]>()
  const user = useSelector(fetchData);

  useEffect(() => {
    fetchCoupon()
    fetchTransfer();
  },[])

  async function fetchCoupon() {
    let res = await getHistoryCouponList(user.id);
    if(res){
      if(res.statusCode === 200 && res.taskStatus) {
        setCoupon(res.data);
      }
    }
  }

  async function fetchTransfer() {
    let res = await getHistoryTransferList(user.id);
    if(res){
      if(res.statusCode === 200 && res.taskStatus) {
        setTransfer(res.data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>ประวัติการใช้งาน</Text>
      </View>
      <View style={styles.body}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#ffff",
            tabBarInactiveTintColor: "#27A65D",
            tabBarIndicatorStyle: {
              backgroundColor: "#2AC36C",
              height: "100%",
              borderTopLeftRadius: active === 1 ? 20 : 0,
              borderTopRightRadius: active === 2 ? 20 : 0,
            },
            tabBarStyle: {
              backgroundColor: "#F5F5F5",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            tabBarLabelStyle: {
              fontFamily: "myFont",
              fontSize: 16,
            },
          }}
        >
          <Tab.Screen
            name="Tab1"
            children={() => <HistoryTransferPoint data={transfer} />}
            options={{ tabBarLabel: "โอนแต้ม" }}
            listeners={{
              swipeStart: (e) => {
                setActive(2);
              },
              tabPress: (e) => {
                setActive(1);
              },
            }}
          />
          <Tab.Screen
            name="Tab2"
            children={() => <HistoryCoupon  data={coupon} />}
            options={{ tabBarLabel: "แลกคูปอง" }}
            listeners={{
              swipeStart: (e) => {
                setActive(1);
              },
              tabPress: (e) => {
                setActive(2);
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    paddingHorizontal: 10,
    width: "75%",
  },
  textHeader: {
    fontFamily: "myFont",
    fontSize: 26,
    color: "#fff",
    alignSelf: "center",
  },
  body: {
    flex: 1,
    marginTop: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
