import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title: string;
  icon: any;
  typeIcon?:number;
  onPress?:() => void;
}

export default function ItemList({ title, icon , typeIcon = 1,onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
          {typeIcon === 1 ? <MaterialIcons name={icon} size={24} color="#27A65D" /> : <MaterialCommunityIcons name={icon} size={24} color="#27A65D" />}
          <Text style={styles.text}>{title}</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color="#27A65D" />
      </View>
      <View style={{borderBottomColor:"#27A65D",borderBottomWidth:1,flex:1}}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop:8
  },
  text: {
    fontFamily: "myFont",
    fontSize: 18,
    fontWeight:"bold",
    color: "#27A65D",
    opacity:0.8
  },
});
