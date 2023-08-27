import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
  title?: string;
  error?: any;
  touched?: any;
}

export const CustomTextInput = ({ placeholder, secureTextEntry, value, onChangeText, title, error, touched }: CustomTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <View  style={[error && touched ? styles.inputValidation : styles.inputContainer]}>
        <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={!showPassword && secureTextEntry} value={value} onChangeText={onChangeText} passwordRules={"."}  />
        {secureTextEntry && (
          <TouchableOpacity style={styles.iconContainer} onPress={toggleShowPassword}>
            <Ionicons name={showPassword ? "eye" : "eye-sharp"} size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      {error && touched ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontFamily: "myFont",
    fontSize: 14,
    marginLeft:10 ,
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCEEE4",
    backgroundColor: "#fff",
    borderRadius: 15,
    
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontFamily: "myFont",
  },
  iconContainer: {
    padding: 10,
  },
  title: {
    fontFamily: "myFont",
    marginLeft: 10,
  },
  inputValidation: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "100%",
    borderColor: "#FF0000",
    // paddingHorizontal: 10,
    fontFamily: "myFont",
    fontSize: 18,
  },
});
