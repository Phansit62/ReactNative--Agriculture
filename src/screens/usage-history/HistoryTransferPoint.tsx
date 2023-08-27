import React from 'react'
import { View,StyleSheet, FlatList , Text} from 'react-native'
import { TransferPoint } from './UsageHistory'
import colors from '../../helpers/colors'
import { formatDate } from '../../helpers/ConvertDate'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    data:TransferPoint[] | undefined
}

export default function HistoryTransferPoint({data}:Props) {
    
    const renderItem = (item:any) => {
        return (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.text}>{item.nameUser}</Text>
                <MaterialCommunityIcons name="bank-transfer-out" size={30} color="black" />
                <Text style={styles.text}>โอนแต้ม {item.points} แต้ม</Text>
                <MaterialCommunityIcons name="bank-transfer-in" size={30} color="black" />
                <Text style={styles.text}>{item.nameToUser}</Text>
              </View>
              <Text>วันที่ทำรายการ {formatDate(item.createdAt,1)}</Text>
            </View>
        )
    }

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
      height:65,
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