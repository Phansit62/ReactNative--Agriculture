import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

interface Props {
  onChange?: any;
  data?: any;
  title?: string;
  error?:any;
  touched?: any;
  values?:any;
  dataValue?:string;
  dataLabel?:string;
}

export default function TextSelector({ data, onChange, title ,error,touched,values , dataValue  , dataLabel }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const setValue = (value:any) => {
    setSelectedLanguage(value);
    onChange(value);
  }
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <View  style={[error && touched ? styles.inputValidation : styles.contanier]}>
        <Picker selectedValue={values} onValueChange={(value: any) => setValue(value)} >
          {values === 0 && <Picker.Item label={"- เลือก -"} value={0} />} 
          {data && data.map((item: any, index: number) => <Picker.Item label={dataLabel ? item[dataLabel] : item} value={dataValue ? item[dataValue] : item} key={index} />)}
        </Picker>
      </View>
      {error && touched ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontFamily: "myFont",
    fontSize: 14,
    marginLeft:10 ,
    marginBottom: 3,
  },
  contanier: {
    borderColor: "#DCEEE4",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    height: 45,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "myFont",
    marginLeft: 10,
    marginBottom: -10,
  },
  inputValidation: {
    borderColor: "#FF0000",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    height: 45,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
  },
});
