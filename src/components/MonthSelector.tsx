import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useState("");
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
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedMonth} onValueChange={(itemValue) => setSelectedMonth(itemValue)}>
        {thaiMonths.map((month, index) => (
          <Picker.Item key={index} label={month.title} value={month.id} />
        ))}
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});
