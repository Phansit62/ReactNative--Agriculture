import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../helpers/colors";

interface Props {
  name: string;
  address: string;
  onPressEdit?: () => void;
  onPressDelete?: () => void;
  default?: boolean;
  deleteButton?: boolean;
  colors?:string;
}

export default function AddressCard({ name, address, onPressEdit, onPressDelete, deleteButton = true,colors = "#fff" }: Props) {
  return (
    <TouchableOpacity onPress={onPressEdit}>
      <View style={[styles.container , colors !== "#fff" && {backgroundColor:colors} ] }>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {deleteButton && (
            <Pressable style={styles.actionButton} onPress={onPressDelete}>
              <Ionicons name="trash" size={20} color="#fff" style={{ backgroundColor: "red", borderRadius: 10, padding: 2 }} />
            </Pressable>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontFamily: "myFont",
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  address: {
    fontFamily: "myFont",
    fontSize: 14,
    color: "#888",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 10,
  },
});
