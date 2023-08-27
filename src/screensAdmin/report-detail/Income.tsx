import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../helpers/colors";
import { formatDate } from "../../helpers/ConvertDate";
import { Ionicons } from "@expo/vector-icons";
import TextSelector from "../../components/TextSelector";
import { reportIncome } from "../../../services/Report.Service";

export default function Income({ navigation }: any) {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const yearData = [
    {
      id: 2023,
      title: "2566",
    },
    { id: 2022, title: "2565" },
    { id: 2021, title: "2564" },
    { id: 2020, title: "2563" },
  ];

  const thaiMonths = [
    { id: 1, title: "มกราคม" },
    { id: 2, title: "กุมภาพันธ์" },
    { id: 3, title: "มีนาคม" },
    { id: 4, title: "เมษายน" },
    { id: 5, title: "พฤษภาคม" },
    { id: 6, title: "มิถุนายน" },
    { id: 7, title: "กรกฎาคม" },
    { id: 8, title: "สิงหาคม" },
    { id: 9, title: "กันยายน" },
    { id: 10, title: "ตุลาคม" },
    { id: 11, title: "พฤศจิกายน" },
    { id: 12, title: "ธันวาคม" },
  ];

  async function fetchData(year: number, month: number) {
    const res = await reportIncome(year,month);
    if(res){
        if(res.statusCode === 200 && res.taskStatus){
            setData(res.data);
        }
    }
  }

  useEffect(() => {
    fetchData(year, month);
  }, [year,month]);

  const renderItem = (item: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.text}>+{item.amount} บาท</Text>
        </View>
        <Text>วันที่ทำรายการ {formatDate(item.paymentDate, 2)}</Text>
      </View>
    );
  };

  console.log(data);

  return (
    <View style={styles.contrainer}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>รายงานรายได้</Text>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: "row", width: "100%",gap:5 }}>
          <View style={{width:"50%"}}>
            <TextSelector
              data={yearData}
              dataLabel="title"
              dataValue="id"
              values={year}
              onChange={(e: number) => {
                setYear(e);
              }}
            />
          </View>
          <View  style={{width:"50%"}}>
            <TextSelector
              data={thaiMonths}
              dataLabel="title"
              dataValue="id"
              values={month}
              onChange={(e: number) => {
                setMonth(e);
              }}
            />
          </View>
        </View>
    <View style={{width:"100%" , alignItems:"flex-end" ,marginBottom:5}}>
       <Text style={styles.textSum}>รายได้รวม {data.reduce((total, item:any) => total + item.amount, 0)} บาท</Text>
    </View>
        <FlatList data={data} renderItem={(item) => renderItem(item.item)} ItemSeparatorComponent={() => <View style={styles.separator} />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contrainer: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    paddingHorizontal: 10,
    width: "70%",
  },
  textHeader: {
    fontFamily: "myFont",
    fontSize: 26,
    color: "#fff",
    alignSelf: "center",
  },
  textSum:{
    fontFamily: "myFont",
    fontSize: 20,
    color: colors.green,
  },
  body: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
  },
  card: {
    height: 65,
    width: "100%",
    padding: 10,
    backgroundColor:"#fff",
    borderRadius:10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "myFont",
    fontSize: 18,
    color: colors.green,
  },
  separator: {
    height: 2, // ความสูงของเส้นระหว่างรายการ
    backgroundColor: colors.green, // สีของเส้นระหว่างรายการ
  },
});
