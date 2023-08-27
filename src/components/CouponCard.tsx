import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import colors from "../helpers/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  name?: string;
  expiry?: string;
  title: "ใช้คูปอง" | "แลกคูปอง";
  disable?: boolean;
  points?:number;
  onPress?: () => void;
}

export default function CouponCard({ name, expiry, title = "แลกคูปอง", disable = false, onPress , points = 0 }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/iconcoupon.png")} style={styles.image} contentFit="cover" />
      <View style={styles.detailsContainer}>
        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
        <Text style={styles.name}>{name}</Text>
        {points !== 0 && <Text style={styles.name}>คะแนนที่ใช้ {points}</Text>}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.expiry}>หมดอายุวันที่: {expiry}</Text>
          {!disable && (
            <TouchableOpacity disabled={disable} onPress={onPress}>
              <Text style={styles.useCoupon}>{title}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    marginTop: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "myFont",
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  expiry: {
    fontFamily: "myFont",
    fontSize: 12,
    color: "#888",
  },
  useCoupon: {
    fontFamily: "myFont",
    backgroundColor: colors.green,
    color: "#fff",
    padding: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
});
