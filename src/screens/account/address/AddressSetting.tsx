import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddressCard from "../../../components/AddressCard";
import { deleteAddress, getAddress } from "../../../../services/Address.Service";
import { useSelector } from "react-redux";
import { fetchData } from "../../../authentication/authSlice";
import province from "../../../json/thai_province.json";
import amphure from "../../../json/thai_amphure.json";
import tambon from "../../../json/thai_tambon.json";
import { CustomsDialog } from "../../../components/CustomsDialog";

export default function AddressSetting({ navigation }: any) {
  const [data, setData] = useState([]);
  const user = useSelector(fetchData);
  const [isOpen,setIsOpen] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    fecthAPI();
  }, [user]);

  async function fecthAPI() {
    let res = await getAddress(user.id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  async function Delete(id:number) {
    let res = await deleteAddress(id);
    if(res){
      setIsOpen(true);
      if(res.statusCode === 200 && res.taskStatus) {
        setMessage("ลบข้อมูลสำเร็จ")
        fecthAPI();
      }
      else{
        setMessage("ลบข้อมูลไม่สำเร็จ")
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>ข้อมูลที่อยู่</Text>
        <Ionicons name="add" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.navigate("FormAddress")} />
      </View>
      <View style={styles.body}>{data && data.map((item: any, index: number) => <AddressCard key={index} onPressEdit={() => navigation.navigate("FormAddress",item.id)} onPressDelete={() => Delete(item.id)} name={item.name} address={`${item.addressAt} ต.${tambon.find((val) => val.id === item.subdistrict)?.name_th} อ.${amphure.find((val) => val.id === item.district)?.name_th} จ.${province.find((val) => val.id === item.province)?.name_th} ${item.postcode}`} />)}</View>
      <CustomsDialog title={message}  visible={isOpen}  onOk={() => setIsOpen(false)} onCancel={() => console.log()} />
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
    width: "100%",
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
