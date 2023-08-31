import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomTextInput } from "../../components/TextInputs";
import { Buttons } from "../../components/Buttons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import TextSelector from "../../components/TextSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, onReload, onStorage } from "../../authentication/authSlice";
import { Formik } from "formik";
import { updateUser } from "../../../services/User.Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomsDialog } from "../../components/CustomsDialog";

export default function ProfileSettings({ navigation }: any) {
  const [image, setImage] = useState<any>("https://satit.udru.ac.th/wp-content/uploads/2020/06/avatar-png-1.png");
  const [upload, setUpload] = useState<any>(null);
  const dispatch = useDispatch<any>();
  const userData = useSelector(fetchData);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const prefix = [
    { id: 1, title: "นาย" },
    { id: 2, title: "นาง" },
    { id: 3, title: "นางสาว" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      base64: false,
      quality: 1,
      exif: true,
    });

    if (result.assets) {
      setUpload(result.assets[0]);
    }
  };

  async function Update(values: any) {
    let res = await updateUser(values);
    if (res) {
      setIsOpen(true);
      if (res.statusCode === 200 && res.taskStatus) {
        // storeData(res.data);
        setMessage("แก้ไขข้อมูลสำเร็จ");
        dispatch(onReload(userData.id));
        navigation.navigate("MainSetting");
      }
      else{
        setMessage("แก้ไขข้อมูลไม่สำเร็จ");
      }
    }
  }

  // const storeData = async (value: any) => {
  //   try {
  //     let data = JSON.stringify(value);
  //     let getData = await AsyncStorage.getItem("@data");
      
  //     var olddata = JSON.parse(getData || "");
  //     if(olddata) {
  //       olddata.email = value.data;
  //       olddata.prefix = value.prefix;
  //       olddata.firstname = value.firstname;

  //     }
  //     await AsyncStorage.setItem("@data", data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    dispatch(onStorage());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>บัญชีผู้ใช้งาน</Text>
      </View>
      <View style={styles.body}>
        <Formik
          enableReinitialize={true}
          // validationSchema={Validation}
          initialValues={{
            id: userData ? userData.id : "",
            prefix: userData ? userData.prefix : 0,
            firstname: userData ? userData.firstname : "",
            lastname: userData ? userData.lastname : "",
            phone: userData ? userData.phone : "",
            email: userData ? userData.email : "",
            upload: upload,
          }}
          onSubmit={(values) => {
            Update(values);
          }}
        >
          {({ setFieldValue, handleSubmit, errors, touched, values }) => (
            <>
              <View style={{ gap: 2 }}>
                <TouchableOpacity style={{ width: 80, height: 80, borderColor: "#27A65D", borderWidth: 5, alignSelf: "center", borderRadius: 60 }} onPress={pickImage}>
                  <Image source={{ uri: upload ? upload.uri : userData.imageProfile }} style={{ width: "100%", height: "100%", borderRadius: 60 }} />
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
              </View>
              <View>
                <Buttons title="ตกลง" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
      <CustomsDialog title={message} visible={isOpen} onOk={() => setIsOpen(false)} onCancel={() => console.log()} />
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
    width: "70%",
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
