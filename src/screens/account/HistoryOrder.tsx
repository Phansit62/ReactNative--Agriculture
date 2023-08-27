import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "../../authentication/authSlice";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getHistoryOrderList } from "../../../services/User.Services";
import colors from "../../helpers/colors";
import { Buttons } from "../../components/Buttons";
import { changeStatus } from "../../../services/Order.Service";

export default function HistoryOrder({ navigation }: any) {
  const [data, setData] = useState([]);
  const user = useSelector(fetchData);

  useEffect(() => {
    fecthAPI();
  }, []);

  async function fecthAPI() {
    let res = await getHistoryOrderList(user.id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  async function ChangeStatus(id: number, status: number) {
    let res = await changeStatus(id, status);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        fecthAPI()
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

  const TextOfStatus = (status: number) => {
    switch (status) {
      case 1:
        return "รอยืนยันคำสั่งซื้อ";
      case 2:
        return "ยืนยันการชำระเงิน";
      case 3:
        return "กำลังจัดส่งสินค้า";
      case 4:
        return "สินค้าถูกจัดส่งเรียบร้อยแล้ว";
      case 5:
        return "ยกเลิกคำสั่งซื้อ";
      
    }
  };

  const OrderCard = (item: any, index: number) => {
    console.log(item)
    return (
      <TouchableOpacity key={index} onPress={() => navigation.navigate("OrderDetail", item.id)}>
        <View style={card.container}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={card.text}>จำนวนสินค้า {item.countDetail} รายการ</Text>
            <Text style={card.text}>{item.totalPrice} บาท</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={card.text}>วันที่สั่งซื้อ {covertDate(item.orderDate)}</Text>
            {/* <Text style={[card.text, item.orderStatus === 1 ? { color: "orange" } : { color: colors.green }]}>{item.orderStatus === 1 ? "รอยืนยันคำสั่งซื้อ" : "ยืนยันคำสั่งซื้อเรียบร้อย"}</Text> */}
            <Text style={[card.text, item.orderStatus === 1 ? { color: "orange" } : { color: colors.green }]}>{TextOfStatus(item.orderStatus)}</Text>
          </View>
          {item.orderStatus === 3 && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Buttons title="ได้รับสินค้าเรียบร้อย" onPress={() => ChangeStatus(item.id, 4)} />
            </View>
          )}
          {item.orderStatus === 4 && item.isReview !== 1 && 
           <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Buttons title="รีวิว" border="#27A65D" colors="#fff" fontColors="#27A65D" onPress={() => navigation.navigate("Review" , {id:item.id})} />
            </View>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>รายการคำสั่งซื้อ</Text>
      </View>
      <ScrollView contentContainerStyle={{padding:5}} style={styles.body}>{data && data.map((item: any, index: number) => OrderCard(item, index))}</ScrollView>
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
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "column",
  },
});

const card = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginTop: 5,
    gap: 10,
  },
  text: {
    fontFamily: "myFont",
  },

});
