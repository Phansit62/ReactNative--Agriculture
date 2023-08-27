import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductCardList from "../../components/ProductCardList";
import SearchBar from "../../components/SearchBar";
import BottomSheet, { BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import { getProducts } from "../../../services/Product.Service";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalBottomSheet from "../../components/BottomSheet";

const HEIGHT = Dimensions.get("window").height;

export default function Products({ navigation }: any) {
  const [data, setData] = useState<any>([]);
  const [showModal,setShowModal] = useState(false)
  const ref = useRef<BottomSheet>(null);

  const handelSnapPress = (index: number) => {
    ref.current?.snapToIndex(index);
  };

  useEffect(() => {
    fecthData(10, 1, "");
  }, []);

  async function fecthData(pagesize: number, currentpage: number, search: string) {
    let res = await getProducts(pagesize, currentpage, search);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>สินค้าทั้งหมด</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.searchBar}>
            <SearchBar onSearch={(e) => fecthData(10, 1, e)} />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Ionicons name="filter" size={28} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
            </TouchableOpacity>
          </View>
          <FlatList showsVerticalScrollIndicator={false} overScrollMode="never" numColumns={2} data={data} keyExtractor={(item) => item.id} renderItem={(item) => <ProductCardList data={item} />} contentContainerStyle={styles.flatListContent} columnWrapperStyle={styles.columnWrapper} />
        </View>
      </View>

      <ModalBottomSheet isOpen={showModal} setIsOpen={setShowModal}>
            <View></View>
      </ModalBottomSheet>
    </>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
  },
  flatListContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
