import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Buttons } from "../../components/Buttons";
import { CustomTextInput } from "../../components/TextInputs";
import { Formik } from "formik";
import { onLogin ,fetchData} from "../../authentication/authSlice";
import { useDispatch  ,useSelector} from "react-redux";

interface Loginstate{
  emailOrPhone:string;
  password:string;
}

export default function Login({ navigation }: any) {
  const dispatch = useDispatch();
  const user = useSelector(fetchData);

  const handleLogin = (values: Loginstate) => {
    dispatch(onLogin(values));
  };

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          emailOrPhone: "",
          password: "",
        }}
        onSubmit={(value) => {
          handleLogin(value);
        }}
      >
        
        {({ setFieldValue, handleSubmit, errors, touched, values }) => (
          <View style={styles.loginBody}>
            
            <View style={{ marginTop: 25, paddingHorizontal: 15, gap: 10 }}>
              <CustomTextInput
                value={values.emailOrPhone}
                onChangeText={(e) => {
                  setFieldValue("emailOrPhone", e);
                }}
                placeholder="อีเมล"
                error={errors.emailOrPhone}
                touched={touched.emailOrPhone}
              />
              <CustomTextInput
                value={values.password}
                onChangeText={(e) => {
                  setFieldValue("password", e);
                }}
                placeholder="รหัสผ่าน"
                error={errors.password}
                touched={touched.password}
                secureTextEntry={true}
              />
              <Text style={styles.forgetText}>ลืมรหัสผ่าน</Text>
              <Buttons title="เข้าสู่ระบบ" onPress={handleSubmit}  />
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", columnGap: 5 }}>
                <Text style={{ fontFamily: "myFont" }}>คุณยังไม่มีบัญชีใช่ไหม?</Text>
                <Text
                  style={{ fontFamily: "myFont", color: "#27A65D", fontWeight: "bold" }}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  ลงทะเบียน
                </Text>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  loginBody: {
    flex: 1,
    marginTop: "70%",
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontFamily: "myFont",
    backgroundColor: "#fff",
    borderColor: "#DCEEE4",
  },
  forgetText: {
    fontFamily: "myFont",
    alignSelf: "flex-end",
    color: "#27A65D",
  },
});
