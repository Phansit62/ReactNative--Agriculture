import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { RootState } from "../../../stores/store";
import { useSelector } from "react-redux";
import { Image } from "expo-image";
import colors from "../../helpers/colors";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../authentication/cartSlice";
import { Buttons } from "../../components/Buttons";
import { fetchData } from "../../authentication/authSlice";

interface Product {
  productId: number;
  image: string;
  productNmae: string;
  price: number;
  quantity: number;
}

export default function ShoppingCart({ navigation }: any) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector(fetchData);
  const dispatch = useDispatch();

  const renderCartItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.cartItemContainer} key={item.productId}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{item.productNmae}</Text>
          <View style={styles.cartItemQuantityContainer}>
            <TouchableOpacity
              onPress={() => {
                if (item.quantity > 1) {
                  dispatch(updateQuantity({ productId: item.productId, quantity: 1, type: 2 }));
                }
              }}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(updateQuantity({ productId: item.productId, quantity: 1, type: 1 }));
              }}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.cartPrice}>{item.price.toFixed(2)} บาท</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <View style={styles.container}>
        <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item) => item.productId.toString()} contentContainerStyle={styles.cartListContainer} ListEmptyComponent={() => <Text style={styles.emptyText}>ไม่พบสินค้าในตะกร้า</Text>} />
         {cartItems.length > 0 && <Buttons title="ชำระเงิน" onPress={() => user.isLogin ? navigation.navigate("Checkout") : navigation.navigate("Login") } /> }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartListContainer: {
    flexGrow: 1,
  },
  cartItemContainer: {
    backgroundColor: colors.backgroundInSide,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    gap: 5,
  },
  cartItemName: {
    fontFamily: "myFont",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cartItemQuantity: {
    fontSize: 16,
  },
  emptyText: {
    fontFamily:"myFont",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#CCC",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemImage: {
    width: 75,
    height: 75,
    borderRadius: 35,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartPrice: {
    fontFamily: "myFont",
    fontSize: 20,
    fontWeight: "bold",
  },
});
