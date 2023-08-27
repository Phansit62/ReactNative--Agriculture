import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomTextInput } from "../../components/TextInputs";
import { Buttons } from "../../components/Buttons";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { Image } from "expo-image";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import TextSelector from "../../components/TextSelector";
import { Formik } from "formik";
import { Validation } from "./Validation";
import { ScrollView } from "react-native-gesture-handler";
import { register } from "../../../services/User.Services";


export default function Register({ navigation }: any) {
  const [image, setImage] = useState<any>("https://satit.udru.ac.th/wp-content/uploads/2020/06/avatar-png-1.png");
  const [upload , setUpload] = useState<any>({});
  const prefix = [
    { id: 1, title: "นาย" },
    { id: 2, title: "นาง" },
    { id: 3, title: "นางสาว" },
  ];

  async function SaveRegister(values:any) {
    let res = await register(values);
    if(res){
      if(res.statusCode === 200 && res.taskStatus){
        navigation.navigate("Login");
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      base64:false,
      quality: 1,
      exif: true,
    });

    if (result.assets) {
      setUpload(result.assets[0]);
  
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
          <Text style={styles.textHeader}>ลงทะเบียน</Text>
        </View>
        <View style={styles.body}>
          <Formik
            enableReinitialize={true}
            validationSchema={Validation}
            initialValues={{
              prefix: 0,
              firstname: "",
              lastname: "",
              phone: "",
              email: "",
              password: "",
              confirmPassword: "",
              upload:upload,
            }}
            onSubmit={(values) => {
              SaveRegister(values);
            }}
          >
            {({ setFieldValue, handleSubmit, errors, touched, values }) => (
              <>
                <View style={{ gap: 2 }}>
                  <TouchableOpacity style={{ width: 80, height: 80, borderColor: "#27A65D", borderWidth: 5, alignSelf: "center", borderRadius: 60 }} onPress={pickImage} >
                   <Image source={{ uri:upload ? upload.uri : "https://satit.udru.ac.th/wp-content/uploads/2020/06/avatar-png-1.png" }} style={{ width: "100%",height:"100%",borderRadius: 60 }} />
                  </TouchableOpacity>
                  <TextSelector
                    title="คำนำหน้าชื่อ"
                    data={prefix}
                    values={values.prefix}
                    error={errors.prefix}
                    touched={touched.prefix}
                    dataLabel="title"
                    dataValue="id"
                    onChange={(e: any) => {
                      setFieldValue("prefix", e);
                    }}
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("firstname", e);
                    }}
                    value={values.firstname}
                    error={errors.firstname}
                    touched={touched.firstname}
                    title="ชื่อ"
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("lastname", e);
                    }}
                    value={values.lastname}
                    error={errors.lastname}
                    touched={touched.lastname}
                    title="นามสกุล"
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("phone", e);
                    }}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    title="เบอร์โทร"
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("email", e);
                    }}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    title="อีเมล"
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("password", e);
                    }}
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    title="รหัสผ่าน"
                    secureTextEntry
                  />
                  <CustomTextInput
                    onChangeText={(e) => {
                      setFieldValue("confirmPassword", e);
                    }}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    title="ยืนยันรหัสผ่าน"
                    secureTextEntry
                  />
                </View>
                <View>
                  <Buttons title="ตกลง" onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
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
    width: "68%",
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
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
