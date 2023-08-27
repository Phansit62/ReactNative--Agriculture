import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import colors from "../../helpers/colors";
import CardData from "../../components/CardData";
import { LineChart, PieChart } from "react-native-chart-kit";
import { dashboardMobile } from "../../../services/Report.Service";
import TextSelector from "../../components/TextSelector";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { onLogOut } from "../../authentication/authSlice";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard({ user }: any) {
  const [data, setData] = useState<any>();
  const [type, setType] = useState(1);
  const [year, setYear] = useState(2023);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
  const dispatch = useDispatch<any>();
  const viewShotRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  useEffect(() => {
    checkMediaLibraryPermission();
  }, []);

  const checkMediaLibraryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    setHasMediaLibraryPermission(status === "granted");
  };

  const yearData = [
    {
      id: 2023,
      title: "2566",
    },
    { id: 2022, title: "2565" },
    { id: 2021, title: "2564" },
    { id: 2020, title: "2563" },
  ];


  async function fetchDataReport(type: number, year: number) {
    let res = await dashboardMobile(type, year);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  const captureView = async () => {
    if (hasMediaLibraryPermission) {
      try {
        const imageURI = await captureRef(viewShotRef, { format: "jpg", quality: 0.9 });
        const asset = await MediaLibrary.createAssetAsync(imageURI);
        await MediaLibrary.createAlbumAsync("MyAlbum", asset, false);
        console.log("Image saved to gallery successfully.");
      } catch (error) {
        console.log("Error saving image:", error);
      }
    }
  };

  useEffect(() => {
    fetchDataReport(type, year);
  }, [type, year]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center" }}>
              <View style={{ width: 80, height: 80, borderRadius: 180, borderColor: "#fff", borderWidth: 2 }}>
                <Image transition={1000} source={{ uri: `${user.imageProfile.split("\\").join("/")}` }} contentFit="cover" style={{ width: "100%", borderRadius: 180, height: "100%" }} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.textHello}>สวัสดี {user.firstname}</Text>
                <TouchableOpacity onPress={() => dispatch(onLogOut())}>
                  <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <MaterialCommunityIcons name="logout" size={28} color="#fff" />
                    <Text style={{ fontFamily: "myFont", fontSize: 18, color: "#fff" }}>ออกจากระบบ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <TextSelector
              data={yearData}
              dataLabel="title"
              dataValue="id"
              values={year}
              onChange={(e: number) => {
                setYear(e);
              }}
            />
            <View style={styles.cardBody}>
              <CardData title="ผู้ใช้งาน" icon="users" count={data && data.users} iconType="FontAwesome5" onPress={() => setType(1)} />
              <CardData title="คำสั่งซื้อ" icon="box" count={data && data.orders} iconType="FontAwesome5" onPress={() => setType(2)} />
              <CardData title="ยกเลิกคำสั่งซื้อ" icon="file-cancel" count={data && data.ordersCancel} iconType="MaterialCommunityIcons" onPress={() => setType(4)} />
              <CardData title="รายได้ (บาท)" icon="money-check-alt" count={data && data.payments.toFixed(2)} iconType="FontAwesome5" onPress={() => setType(3)} onLongPress={() => navigation.navigate("Income")} />
            </View>

            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1.0 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[styles.textHello, { fontSize: 18 }]}>ปี พ.ศ {year + 543}</Text>
                <TouchableOpacity onPress={captureView}>
                  <Text style={[styles.textHello, { fontSize: 16 }]}>บันทึกข้อมูล</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                {data ? (
                  <LineChart
                    data={{
                      labels: data && data.charts.map((val: any) => val.label),
                      datasets: [
                        {
                          data: data && data.charts.map((val: any) => val.value),
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width / 1.05} // from react-native
                    height={230}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 5,
                      borderRadius: 16,
                    }}
                  />
                ) : (
                  <ActivityIndicator size="large" color={colors.green} />
                )}
              </View>
             
            </ViewShot>
            
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "column",
    marginTop: "13%",
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
    backgroundColor: colors.green,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
