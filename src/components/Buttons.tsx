import React from 'react'
import { View,Text,TouchableOpacity,StyleSheet} from 'react-native'

interface CustomButtonProps {
    title: string;
    onPress?: () => void;
    colors?:string;
    border?:string;
    fontColors?:string;
  }

export function Buttons({ title, onPress,colors = "#27A65D",border = "" , fontColors = "#fff" }:CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button , {backgroundColor:colors,borderColor:border,borderWidth:border ? 2 : 0} ]} onPress={onPress}>
      <Text style={[styles.buttonText , {color:fontColors}]}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });