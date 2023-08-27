import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CouponCard from "../../components/CouponCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, onReload } from "../../authentication/authSlice";
import { getCouponList } from "../../../services/Coupon.Service";
import { redeemCoupon } from "../../../services/User.Services";
import { formatDate } from "../../helpers/ConvertDate";

export default function Coupon({ navigation }: any) {
  const [data, setData] = useState();
  const user = useSelector(fetchData);
  const dispatch = useDispatch<any>();
  const [pagin, setPagin] = useState({
    currentpage: 1,
    pagesize: 10,
    totalpages: 0,
    totalrows: 0,
  });

  useEffect(() => {
    FetchData(pagin.pagesize, 1);
  }, [pagin.pagesize]);

  async function FetchData(pagesize: number, currentpage: number) {
    let res = await getCouponList(pagesize, currentpage, "");
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  async function RedeemCoupon(couponId: number) {
    let res = await redeemCoupon(user.id, couponId);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        dispatch(onReload(user.id));
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>คูปองส่วนลดทั้งหมด</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          keyExtractor={(key) => key.id}
          data={data}
          numColumns={1}
          onEndReachedThreshold={0.1}
          onEndReached={() =>
            pagin.pagesize < pagin.totalrows &&
            setPagin((prevState) => ({
              pagesize: prevState.pagesize + 10,
              currentpage: prevState.currentpage,
              totalpages: prevState.totalpages,
              totalrows: prevState.totalrows,
            }))
          }
          renderItem={({ item }) => (
            <CouponCard
              title={user.coupons && user.coupons.includes(item.id) ? "ใช้คูปอง" : "แลกคูปอง"}
              points={item.points}
              name={item.name}
              expiry={formatDate(item.expiredAt,2)}
              disable={user.isLogin === false}
              onPress={() => {
                !user.coupons.includes(item.id) ? RedeemCoupon(item.id) : null;
              }}
            />
          )}
          ListEmptyComponent={() => <Text style={styles.emptyText}>ไม่มีคูปองส่วนลด</Text>}
        />
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
    width: "80%",
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
  },
  emptyText: {
    fontFamily: "myFont",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  },
});
