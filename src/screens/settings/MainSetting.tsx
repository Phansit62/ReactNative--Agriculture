import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ItemList from "../../components/ItemList";
import { Buttons } from "../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, onLogOut } from "../../authentication/authSlice";
import colors from "../../helpers/colors";

export default function MainSetting({ navigation }: any) {
  const dispatch = useDispatch();
  const user = useSelector(fetchData);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>ตั้งค่า</Text>
      </View>
      {user.isLogin ? (
        <View style={styles.body}>
          <View style={{ gap: 10 }}>
            <ItemList title="บัญชีผู้ใช้งาน" icon="account-circle" onPress={() => navigation.navigate("ProfileSettings")} />
            <ItemList title="ที่อยู่" icon="location-pin" onPress={() => navigation.navigate("AddressSetting")} />
            <ItemList title="ประวัติการใช้งาน" icon="history" onPress={() => navigation.navigate("UsageHistory")} />
            <ItemList title="คำสั่งซื้อ" icon="shopping-bag" onPress={() => navigation.navigate("HistoryOrder")} />
            <ItemList title="คูปองของฉัน" icon="ticket-confirmation-outline" typeIcon={0} onPress={() => navigation.navigate("Coupon")} />
            {/* <ItemList title="เปลื่ยนรหัส PIN" icon="fiber-pin" /> */}
            <ItemList title="ติดต่อเจ้าหน้าที่" icon="support-agent" onPress={() => navigation.navigate("ContactUs")} />
          </View>
          <View>
            <Buttons
              title="ออกจากระบบ"
              colors="#FC4646"
              onPress={() => {
                dispatch(onLogOut());
              }}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.body, { justifyContent: "center", alignItems: "center" }]}>
          <Text style={[styles.textHeader, { color: colors.green, fontSize: 34 }]}>คุณยังไม่ได้เข้าสู่ระบบ</Text>
          <Text style={[styles.textHeader, { color: "#000", fontSize: 18 }]}>กรุณาเข้าสู่ระบบก่อนใช้งานเมนูตั้งค่า</Text>
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    paddingHorizontal: 10,
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
    justifyContent: "space-between",
  },
});
