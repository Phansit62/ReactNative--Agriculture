import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import CategoryCard from "../../components/CategoryCard";
import SearchBar from "../../components/SearchBar";
import SliderImage from "../../components/SliderImage";
import ProductCard from "../../components/ProductCard";
import { Image } from "expo-image";
import { baseURL } from "../../helpers/ConnectAPI.axios";
import category from "../../json/category.json";
import { getCouponList } from "../../../services/Coupon.Service";
import CouponCard from "../../components/CouponCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { onReload, onStorage } from "../../authentication/authSlice";
import { redeemCoupon } from "../../../services/User.Services";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomsDialog, CustomsDialogFormTransferPoint, CustomsDialogQusetion } from "../../components/CustomsDialog";
import { createTransfer } from "../../../services/TransferPoint.Service";
import { formatDate } from "../../helpers/ConvertDate";

const HEIGHT = Dimensions.get("window").height;

export default function MainHome({ user }: any) {
  const [couponData, setCouponData] = useState([]);
  const [isShow, setShow] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [message,setMessage] = useState("");

  async function fetchCoupon() {
    let res = await getCouponList(5, 1, "");
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setCouponData(res.data);
      }
    }
  }

  async function saveTransferPoint(value: any) {
    let res = await createTransfer(value);
    if (res) {
      setIsOpen(true);
      if (res.statusCode === 200 && res.taskStatus) {
        setMessage("ทำรายการสำเร็จ");
        dispatch(onReload(user.id));
        setShow(false);
      }
      else {
        setMessage(res.message)
      }
    }
  }

  useEffect(() => {
    dispatch(onStorage());
    fetchCoupon();
  }, []);

  async function RedeemCoupon(couponId: number) {
    let res = await redeemCoupon(user.id, couponId);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        dispatch(onReload(user.id));
        fetchCoupon();
      }
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never"  contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }}>
      <CustomsDialog title={message} visible={isOpen} onOk={() => setIsOpen(false)} onCancel={() => console.log()} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", paddingHorizontal: 10, justifyContent: "space-between", alignItems: "center" }}>
            <View>
              {user.isLogin ? (
                <Text style={styles.textHello}>สวัสดี {user.firstname}</Text>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.textHello}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
              )}

              {user.isLogin && (
                <View style={styles.pointBody}>
                  <Text style={{ fontFamily: "myFont", fontSize: 18, color: "#fff", marginRight: 5 }}>แต้มทั้งหมดของคุณ</Text>
                  <Text style={{ fontFamily: "myFont", fontSize: 24, color: "#fff" }}>{user.point ?? 0}</Text>
                  <MaterialCommunityIcons name="bank-transfer" size={35} color="#fff" style={{ marginLeft: 5 }} onPress={() => setShow(true)} />
                </View>
              )}
            </View>

            <View style={{ width: 60, height: 60, borderRadius: 180, borderColor: "#fff", borderWidth: 2 }}>
              <Image transition={1000} source={{ uri: user.imageProfile || "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png" }} contentFit="cover" style={{ width: "100%", borderRadius: 180, height: "100%" }} />
            </View>
          </View>
          <View style={styles.searchBar}>
            <SearchBar onSearch={(e) => console.log(e)} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <SliderImage />
          </View>
          <View style={styles.category}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 13 }}>
              <Text style={{ fontFamily: "myFont", fontSize: 16 }}>ประเภทสินค้า</Text>
              <Text style={{ color: "#27A65D", fontFamily: "myFont", fontSize: 16 }}>ทั้งหมด</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <ScrollView showsHorizontalScrollIndicator={false} overScrollMode="never" horizontal contentContainerStyle={{ columnGap: 13 }}>
                {category.map((item: any, index: number) => (
                  <CategoryCard name={item.title} image={item.image} key={index} />
                ))}
              </ScrollView>
            </View>
          </View>
          {/* <View style={styles.category}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 13 }}>
              <Text style={{ fontFamily: "myFont", fontSize: 16 }}>สินค้าขายดี</Text>
              <Text style={{ color: "#27A65D", fontFamily: "myFont", fontSize: 16 }}>ทั้งหมด</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <ScrollView showsHorizontalScrollIndicator={false} overScrollMode="never" horizontal contentContainerStyle={{ columnGap: 13 }}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </ScrollView>
            </View>
          </View> */}
          <View style={styles.category}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 13 }}>
              <Text style={{ fontFamily: "myFont", fontSize: 16 }}>คูปองส่วนลด</Text>
              <Text style={{ color: "#27A65D", fontFamily: "myFont", fontSize: 16 }} onPress={() => navigation.navigate("CouponList")}>
                ทั้งหมด
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <ScrollView showsHorizontalScrollIndicator={false} overScrollMode="never" horizontal contentContainerStyle={{ columnGap: 5 }}>
                {couponData.map((item: any, index: number) => (
                  <CouponCard
                    key={index}
                    title={user.coupons && user.coupons.includes(item.id) ? "ใช้คูปอง" : "แลกคูปอง"}
                    points={item.points}
                    name={item.name}
                    expiry={formatDate(item.expiredAt, 2)}
                    disable={user.isLogin === false}
                    onPress={() => {
                      !user.coupons.includes(item.id) ? RedeemCoupon(item.id) : null;
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <CustomsDialogFormTransferPoint visible={isShow} title="โอนแต้ม" onOk={(e) => saveTransferPoint(e)} onCancel={() => setShow(false)} data={user.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "column",
    marginTop: "10%",
  },
  textHello: {
    fontFamily: "myFont",
    fontSize: 36,
    color: "#fff",
  },
  pointBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -10,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
  },
  category: {
    height: HEIGHT * 0.24,
    flexDirection: "column",
    marginTop: "5%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
});
