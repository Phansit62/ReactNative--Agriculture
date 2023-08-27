import React from 'react'
import { View,StyleSheet,Text, FlatList } from 'react-native'
import { Coupon } from './UsageHistory'
import { formatDate } from '../../helpers/ConvertDate'
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../../helpers/colors';

interface Props {
    data:Coupon[] | undefined
}

export default function HistoryCoupon({data}:Props) {
  const renderItem = (item:any) => {
    return (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.text}>ใช้แต้มจำนวน {item.points} แต้ม</Text>
            <FontAwesome5 name="exchange-alt" size={30} color="black" />
            <Text style={styles.text}>แลกคูปองส่วนลด {item.discount} บาท</Text>
            <Text style={styles.text}>{item.nameToUser}</Text>
          </View>
          <Text>วันที่ทำรายการ {formatDate(item.createdAt,1)}</Text>
        </View>
    )
}
console.log(data);
return (
  <View style={styles.contrainer}>
    <FlatList  data={data} renderItem={((item) => renderItem(item.item))} ItemSeparatorComponent={() => <View style={styles.separator} />}/>
  </View>
)
}

const styles = StyleSheet.create({
  contrainer:{
      flex:1,
      paddingHorizontal:10
  },
  card:{
    height:75,
    width:"100%",
    padding:10,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  text:{
    fontFamily:"myFont",
    fontSize:18,
    color:colors.green
  },
  separator: {
    height: 2, // ความสูงของเส้นระหว่างรายการ
    backgroundColor: colors.green, // สีของเส้นระหว่างรายการ
  },
})