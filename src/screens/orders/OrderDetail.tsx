import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getOrderDetail } from "../../../services/Order.Service";
import colors from "../../helpers/colors";
import { Image } from "expo-image";

interface Product {
  productsId: number;
  image: string;
  productNmae: string;
  price: number;
  quantity: number;
}

export default function OrderDetail({ navigation, route }: any) {
  const [data, setdata] = useState<any>({});
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let res = await getOrderDetail(route.params);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setdata(res.data);
      }
    }
  }

  const covertDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const renderCartItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.cartItemContainer} key={item.productsId}>
        {/* <Image source={item.image} style={styles.cartItemImage} /> */}
        <View style={{ flex: 1 }}>
          <Text style={styles.cartItemName}>{item.productNmae}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.cartPrice}>{item.price && item.price.toFixed(2)} บาท</Text>
        </View>
      </View>
    );
  };

  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>รายละเอียดคำสั่งซื้อ</Text>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>รหัสคำสั่งซื้อ </Text>
          <Text style={styles.textSec}>{data.ordersId}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>รวมยอดชำระ(บาท)</Text>
          <Text style={styles.textSec}>{data.amount && data.amount.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>ช่องทางการชำระเงิน</Text>
          <Text style={styles.textSec}>{data.paymentMethod === 1 ? "ชำระเงินผ่านธนาคาร" : "ชำระเงินปลายทาง"}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>วันที่สั่งซื้อ</Text>
          <Text style={styles.textSec}> {covertDate(data.orderDate)}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.text}>คูปองส่วนลด</Text>
          <Text style={styles.textSec}>{data.couponsId === 0 ? "ไม่มี" : "ใช้คูปองส่วนลด"} </Text>
        </View>

        {/* <View style={{ width: "100%", height: 250 }}>
          <FlatList data={data.orderDetail} renderItem={renderCartItem} keyExtractor={(item) => item.productsId.toString()} contentContainerStyle={styles.cartListContainer} />
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
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
    flexDirection: "column",
    gap: 10,
  },
  text: {
    fontFamily: "myFont",
    fontSize: 17,
  },
  textSec: {
    fontFamily: "myFont",
    fontSize: 16,
    marginLeft: 5,
    color: colors.green,
  },
  cartListContainer: {
    flexGrow: 1,
  },
  cartItemContainer: {
    backgroundColor: colors.green,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    gap: 5,
  },
  cartItemName: {
    fontFamily: "myFont",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cartItemQuantity: {
    fontSize: 16,
  },
  cartItemImage: {
    width: 75,
    height: 75,
    borderRadius: 35,
    marginRight: 10,
  },
  cartPrice: {
    fontFamily: "myFont",
    fontSize: 20,
    fontWeight: "bold",
    color:"#fff"
  },
});
