import React from 'react'
import { Text,View,StyleSheet } from 'react-native'
import { Image } from 'expo-image';

interface Props{
    name?:string;
    image?:string;
}

export default function CategoryCard({name,image}:Props) {
  return (
    <View style={styles.container} >
        <View style={styles.body}>
            <Image source={{uri:image}} style={styles.image} cachePolicy={'memory-disk'} contentFit='fill' transition={600}/>
        </View>
        <Text style={styles.text}>{name}</Text>
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
        marginTop:10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius:20
      },
});