import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomTextInput } from "../../../components/TextInputs";
import { Buttons } from "../../../components/Buttons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import TextSelector from "../../../components/TextSelector";
import { Formik } from "formik";
import { createAddress, getAddressDetail, updateAddress } from "../../../../services/Address.Service";
import province from "../../../json/thai_province.json";
import amphure from "../../../json/thai_amphure.json";
import tambon from "../../../json/thai_tambon.json";
import { Picker } from "@react-native-picker/picker";
import { Validation } from "./Validateion";
import { Switch } from "react-native-switch";
import CustomsSwitch from "../../../components/CustomsSwitch";
import { useSelector } from "react-redux";
import { fetchData } from "../../../authentication/authSlice";
import { atan } from "react-native-reanimated";

export default function FormAddress({ navigation, route }: any) {
  const user = useSelector(fetchData);
  const [data, setData] = useState<any>();

  async function Save(values: any) {
    let res = data ? await updateAddress(values) : await createAddress(values);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        navigation.navigate("AddressSetting");
      }
    }
  }

  async function fecthDetail() {
    let res = await getAddressDetail(route.params);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  useEffect(() => {
    if (route.params) {
      fecthDetail();
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={28} color="black" style={{ backgroundColor: "#fff", borderRadius: 30 }} onPress={() => navigation.goBack()} />
        <Text style={styles.textHeader}>เพิ่มข้อมูลที่อยู่</Text>
      </View>
      <View style={styles.body}>
        <Formik
          validationSchema={Validation}
          enableReinitialize={true}
          initialValues={{
            id:data ? data.id : 0 ,
            userId: user.id,
            name:data ? data.name : "",
            addressAt: data ? data.addressAt : "",
            district:data ? data.district : 0,
            subdistrict:data ? data.subdistrict : 0,
            province:data ? data.province : 0,
            postcode:data ? data.postcode : "",
            is_default:data ? data.is_default : 0,
          }}
          onSubmit={(value) => {
            Save(value);
          }}
        >
          {({ setFieldValue, handleSubmit, errors, touched, values }) => (
            <>
              <View style={{ gap: 2 }}>
                <CustomTextInput value={values.name} error={errors.name} touched={touched.name} title="ชื่อ" onChangeText={(text) => setFieldValue("name", text)} />
                <CustomTextInput value={values.addressAt} error={errors.addressAt} touched={touched.addressAt} onChangeText={(text) => setFieldValue("addressAt", text)} title="ที่อยู่" />
                <TextSelector data={province} dataLabel="name_th" dataValue="id" title="จังหวัด" values={values.province} error={errors.province} touched={touched.province} onChange={(e: number) => setFieldValue("province", e)} />
                <TextSelector
                  data={values.province !== 0 ? amphure.filter((item) => item.province_id === values.province) : []}
                  dataLabel="name_th"
                  dataValue="id"
                  title="อำเภอ"
                  values={values.district}
                  error={errors.district}
                  touched={touched.district}
                  onChange={(e: number) => {
                    setFieldValue("district", e);
                  }}
                />
                <TextSelector
                  data={values.district !== 0 ? tambon.filter((item) => item.amphure_id === values.district) : []}
                  dataLabel="name_th"
                  dataValue="id"
                  title="ตำบล"
                  values={values.subdistrict}
                  error={errors.subdistrict}
                  touched={touched.subdistrict}
                  onChange={(e: number) => {
                    setFieldValue("subdistrict", e);
                    let postcode = tambon.find((val) => val.id === e && val.amphure_id === values.district)?.zip_code;
                    setFieldValue("postcode", postcode?.toString());
                  }}
                />
                {/* <Picker selectedValue={values.postcode}>{Postcode && Postcode.map((item: any, index: number) => <Picker.Item label={item} value={item} key={index} />)}</Picker> */}
                {/* <TextSelector data={Postcode} values={values.postcode} error={errors.postcode} touched={touched.postcode}   title="รหัสไปรษณีย์" /> */}
                <CustomTextInput value={values.postcode} error={errors.postcode} touched={touched.postcode} title="รหัสไปรษณีย์" onChangeText={(text) => setFieldValue("postcode", text)} />
                <CustomsSwitch title="ตั้งเป็นค่าเริ่มต้น" values={values.is_default === 0 ? false : true} onChage={(val: boolean) => setFieldValue("is_default", val ? 1 : 0)} />
              </View>
              <View>
                <Buttons title="ตกลง" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27A65D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
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
