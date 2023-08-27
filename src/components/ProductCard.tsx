import React from 'react'
import { Text,View,StyleSheet } from 'react-native'
import { Image } from 'expo-image';



export default function ProductCard() {
  return (
    <View style={styles.container} >
        <Image cachePolicy={"disk"} source="https://cdn-cakfh.nitrocdn.com/uCvbbthIGuqozYBVHNiffOSAfPDdhkkl/assets/images/optimized/rev-baeb3b1/wp-content/uploads/2021/01/Avocado_21082020_01.jpg" contentFit='cover' transition={800} style={styles.body} />
        <Text style={styles.text}>ชื่อสินค้า</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:100,
        height:130,
        backgroundColor:"#fff",
    },
    body:{
        width:100,
        height:100,
        backgroundColor:"#E1EDE4",
        borderRadius:20
    },
    text:{
        fontFamily:"myFont",
        fontSize:16,
        alignSelf:"center",
        marginTop:5
    }
});