import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import colors from "../../helpers/colors";
import { addToCart } from "../../authentication/cartSlice";
import { useDispatch } from "react-redux";
import { getReviewsList } from "../../../services/Reviews.Service";
import ReviewCard from "../../components/ReviewCard";

interface Props {
  route: any;
}

interface Product {
  productId: number;
  image: string;
  productNmae: string;
  price: number;
  quantity: number;
}

const ProductDetail = ({ route }: Props) => {
  const product = route.params;
  const [count, setCount] = useState<string>("1");
  const dispatch = useDispatch();
  const [comments, setComments] = useState<string[]>([]);
  const [review, setReview] = useState([]);

  const addItemCart = (data: Product) => {
    // // Add the product to the cart with the selected quantity
    // console.log("Product added to cart:", product, "Quantity:", count);
    dispatch(addToCart(data));
  };

  const incrementCount = () => {
    if(product.stock > count){
      const newCount = parseInt(count) + 1;
      setCount(newCount.toString());
    }
  };

  const decrementCount = () => {
    if (parseInt(count) > 1) {
      const newCount = parseInt(count) - 1;
      setCount(newCount.toString());
    }
  };

  const addComment = () => {
    setComments([...comments, "New comment"]);
  };

  async function FetchReview(id: number) {
    let res = await getReviewsList(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setReview(res.data);
      }
    }
  }

  useEffect(() => {
    FetchReview(product.id);
  }, [product]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: product.image !== "" ? product.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
          }}
          contentFit="contain"
          transition={800}
          style={styles.image}
        />
        <View style={styles.body}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.textTitle}>{product.name}</Text>
              <Text style={styles.textDescription}>{product.description}</Text>
              <Text style={styles.textPrice}>{`ราคา / กิโล ${product.price} บาท`}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decrementCount} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput style={styles.textInput} value={count} onChangeText={setCount} keyboardType="numeric" />
                <TouchableOpacity onPress={incrementCount} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  addItemCart({ productNmae: product.name, productId: product.id, quantity: parseInt(count), image: product.image, price: product.price });
                }}
                style={styles.addButton}
              >
                <Text style={styles.addButtonLabel}>Add to Cart</Text>
              </TouchableOpacity>

             <View style={styles.reviewsContainer}>
                <Text style={styles.reviewsTitle}>รีวิวสินค้า</Text>
                <ScrollView contentContainerStyle={{ paddingVertical:10 }} showsVerticalScrollIndicator={false}>
                  {review.map((item: any, index) => (
                    <ReviewCard key={index} review={item} />
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  body: {
    height: "100%",
    width: "100%",
    backgroundColor: "#DCEEE4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
    position: "absolute",
    top: 250,
  },
  image: {
    width: "100%",
    height: 290,
    borderRadius: 25,
  },
  textTitle: {
    fontFamily: "myFont",
    fontSize: 32,
    color: "#000",
    alignSelf: "center",
    marginTop: 20,
  },
  textDescription: {
    fontFamily: "myFont",
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
  textPrice: {
    fontFamily: "myFont",
    fontSize: 24,
    color: colors.green,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  textInput: {
    fontFamily: "myFont",
    fontSize: 22,
    backgroundColor: "#fff",
    width: 60,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewsContainer: {
    marginTop: 20,
    height:800,
  },
  reviewsTitle: {
    fontFamily: "myFont",
    fontSize: 24,
    color: "#000",
  },
  reviewText: {
    fontFamily: "myFont",
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  addCommentButton: {
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 10,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetail;
