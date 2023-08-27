import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-switch";

interface Props {
  values?: boolean;
  onChage?: any;
  title: string;
}

export default function CustomsSwitch({ values, title, onChage }: Props) {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Switch value={values} onValueChange={(val) => onChage(val)} backgroundActive={"green"} switchLeftPx={5} switchRightPx={5} backgroundInactive={"gray"} circleSize={30} innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop:5
  },
  text: {
    fontFamily:"myFont",
    fontSize: 14,
    marginBottom: 4,
  },
});
