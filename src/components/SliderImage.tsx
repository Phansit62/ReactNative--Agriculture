import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect, useRef} from "react";
import { Image } from "expo-image";
import { getNews } from "../../services/News.Service";

interface Props {
  onchange?: any;
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default function SliderImage({ onchange }: Props) {
  const [img, setimg] = useState(0);
  const [advert,setAdvert] = useState([]);
  const scrollViewRef: any = useRef(null);
  // const [advert, setAdvert] = useState([]);

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / WIDTH);
      if (slide !== img) {
        setimg(slide);
      }
    }
  };

  async function fetchData() {
    const res = await getNews();
    if(res) {
      if(res.statusCode === 200 && res.taskStatus){
        setAdvert(res.data)
      }
    }
  }

  useEffect(() => {
    fetchData()
  },[])


  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = img + 1;
      if (newIndex >= advert.length) {
        newIndex = 0;
      }
      setimg(newIndex);
      scrollViewRef.current.scrollTo({
        x: newIndex * WIDTH,
        y: 0,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [img, advert.length, WIDTH]);

  useEffect(() => {
    if (img === advert.length - 1) {
      setimg(0);
    }
  }, [advert.length]);

  return (
    <View style={styles.wrap}>
      <ScrollView ref={scrollViewRef} onScroll={handleScroll} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} pagingEnabled horizontal>
        {advert.map((e:any, index) => (
          <View key={index} style={{ width: WIDTH, height: "100%", paddingHorizontal: 10 }}>
            <Image style={styles.images} contentFit="fill" source={{ uri: e.image }} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {advert.map((e, index) => (
          <Text key={index} style={img == index ? styles.dotActive : styles.dot}>
            __
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.28,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "#fff",
  },
  dot: {
    margin: 3,
    color: "#000",
  },
  images: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
