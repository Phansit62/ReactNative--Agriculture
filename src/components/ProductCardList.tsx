import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import category from "../json/category.json";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  price: string;
  onPress: () => void;
}

export default function ProductCardList({ data }: any) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", data.item);
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: data.item.image !== "" ? data.item.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" }} contentFit="contain" transition={800} style={styles.image} />
        <Text style={styles.text}>{data.item.name}</Text>
        <Text style={styles.price}>
          {data.item.price} / {category.find((val) => val.id === data.item.category)?.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 190,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 25,
  },
  text: {
    fontFamily: "myFont",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 5,
  },
  price: {
    fontFamily: "myFont",
    fontSize: 16,
    marginTop: -5,
  },
});
