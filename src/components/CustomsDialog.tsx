import { Formik } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import { CustomTextInput } from "./TextInputs";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { fetchData } from "../authentication/authSlice";

interface Props {
  visible: boolean;
  title: string;
  description?: string;
  onOk: (e?: any) => void;
  onCancel: () => void;
  data?: any;
}

export function CustomsDialogQusetion({ visible, title, description = "", onOk, onCancel }: Props) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
    },
    title: {
      fontFamily: "myFont",
      fontSize: 18,
    },
    text: {
      fontFamily: "myFont",
      fontSize: 16,
    },
  });
  return (
    <View>
      <Dialog.Container visible={visible} contentStyle={styles.container}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Description style={styles.text}>{description}</Dialog.Description>
        <Dialog.Button label="ยกเลิก" onPress={() => onCancel()} />
        <Dialog.Button label="ตกลง" onPress={() => onOk()} />
      </Dialog.Container>
    </View>
  );
}

export function CustomsDialogFormTransferPoint({ visible, title, onOk, onCancel, data }: Props) {
  const user = useSelector(fetchData);
  const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
    },
    title: {
      fontFamily: "myFont",
      fontSize: 18,
    },
    text: {
      fontFamily: "myFont",
      fontSize: 16,
    },
    buttonBody: {
      flexDirection: "row-reverse",
    },
  });
  
  const Validation = yup.object().shape({
    telephone: yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
    points: yup.number().min(1, "กรุณากรอกแต้ม").max(user.point, "แต้มของคุณมีไม่ถึง").required("กรุณากรอกแต๋มของคุณ"),
  });

  return (
    <View>
      <Dialog.Container visible={visible} contentStyle={styles.container}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Formik
          enableReinitialize={true}
          validationSchema={Validation}
          initialValues={{
            userId: data,
            telephone: "",
            points: "",
          }}
          onSubmit={(value) => onOk(value)}
        >
          {({ errors, touched, values, setFieldValue, handleSubmit }) => (
            <View>
              <CustomTextInput title="เบอร์โทรศัพท์" value={values.telephone} error={errors.telephone} touched={touched.telephone} onChangeText={(e) => setFieldValue("telephone", e)} />
              <CustomTextInput title="จำนวนแต้ม" value={values.points} error={errors.points} touched={touched.points} onChangeText={(e) => setFieldValue("points", e)} />
              <View style={styles.buttonBody}>
                <Dialog.Button label="ยกเลิก" onPress={() => onCancel()} />
                <Dialog.Button label="ตกลง" onPress={() => handleSubmit()} />
              </View>
            </View>
          )}
        </Formik>
      </Dialog.Container>
    </View>
  );
}

export function CustomsDialog({ visible, title, description = "", onOk }: Props) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
    },
    title: {
      fontFamily: "myFont",
      fontSize: 18,
    },
    text: {
      fontFamily: "myFont",
      fontSize: 16,
    },
  });
  return (
    <View>
      <Dialog.Container visible={visible} contentStyle={styles.container}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Description style={styles.text}>{description}</Dialog.Description>
        <Dialog.Button label="ตกลง" onPress={() => onOk()} />
      </Dialog.Container>
    </View>
  );
}
