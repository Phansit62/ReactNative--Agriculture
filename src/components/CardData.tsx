import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
    title?:string;
    icon?:string;
    count?:number;
    iconType?: "MaterialCommunityIcons" | "FontAwesome5";
    onPress?:any;
    onLongPress?:any;
}

export default function CardData({title = "" , icon = "" ,count = 0 , iconType = "MaterialCommunityIcons",onPress,onLongPress}:Props) {

    const ChangeIcon = () => {
        switch(iconType) {
            case "MaterialCommunityIcons" : return <MaterialCommunityIcons name={icon} size={30} color="black" />;
            case "FontAwesome5" : return <FontAwesome5 name={icon} size={30} color="black" />
        }
    }
  return (
   <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
     <View style={styles.container}>
      <View style={styles.body}>
        {ChangeIcon()}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{count}</Text>
      </View>
    </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 140,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "myFont",
    fontSize: 18,
  },
});
