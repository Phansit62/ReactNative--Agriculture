import React, { useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../../helpers/colors";

export default function ContactUs({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>ติดต่อเจ้าหน้าที่</Text>
      </View>
      <View style={styles.body}>
      <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <MaterialIcons name="support-agent" size={84} color={colors.green} />
            </View>
            <View style={[styles.properties, { marginTop: 36.2 }]}>
            <MaterialIcons name="call" size={24} color="black" />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.texttitle}>เบอร์โทรติดต่อ</Text>
                <Text style={styles.texttitles} onPress={() => {
                  Linking.openURL(`tel:090-000-0000`)
                }}>090-000-0000</Text>
              </View>
            </View>
            <View style={[styles.properties, { marginTop: 16 }]}>
            <MaterialIcons name="email" size={24} color="black" />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.texttitle}>อีเมล</Text>
                <Text style={styles.texttitles} onPress={() => {
                  Linking.openURL(`mailto:phansit@gmail.com`)
                }}>phansit@gmail.com</Text>
              </View>
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    paddingHorizontal: 10,
    width: "74%",
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
  },
  texttitle: {
    fontSize: 16,
    color: "#000",
    fontFamily: "myFont",
  },
  texttitles: {
    fontSize: 18,
    color: colors.green,
    fontFamily: "myFont",
  },
  properties: {
    padding: 20,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#EBF3FF",
    borderRadius: 10,
  },
});
