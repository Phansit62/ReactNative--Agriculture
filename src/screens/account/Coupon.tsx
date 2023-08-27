import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Buttons } from "../../components/Buttons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CouponCard from "../../components/CouponCard";
import { getCouponUserList } from "../../../services/User.Services";
import { useSelector } from "react-redux";
import { fetchData } from "../../authentication/authSlice";


export default function Coupon({ navigation }: any) {
  const [active, setActive] = useState(1);
  const [data,setData] = useState();
  const user = useSelector(fetchData)

  useEffect(() => {
    FetchData()
  },[])

  async function FetchData() {
    let res = await getCouponUserList(user.id);
    if(res){
      if(res.statusCode === 200 && res.taskStatus){
        setData(res.data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>คูปองของฉัน</Text>
      </View>
      <View style={styles.body}>
        <FlatList keyExtractor={(key) => key.id} data={data} renderItem={(item) => <CouponCard name={item.item.couponName} expiry={item.item.expiredAt} title="ใช้คูปอง" /> } ListEmptyComponent={() => <Text style={styles.emptyText}>คุณยังไม่มีคูปองส่วนลด</Text>} />
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
    width: "70%",
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
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },  emptyText: {
    fontFamily:"myFont",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  },
});
