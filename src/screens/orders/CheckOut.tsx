import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import AddressCard from "../../components/AddressCard";
import colors from "../../helpers/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getCouponUserList } from "../../../services/User.Services";
import { fetchData, onReload } from "../../authentication/authSlice";
import { getAddress } from "../../../services/Address.Service";
import ModalBottomSheet from "../../components/BottomSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import province from "../../json/thai_province.json";
import amphure from "../../json/thai_amphure.json";
import tambon from "../../json/thai_tambon.json";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { createOrder } from "../../../services/Order.Service";
import { clearCart } from "../../authentication/cartSlice";
import CouponCard from "../../components/CouponCard";

export default function Checkout({ navigation }: any) {
  const user = useSelector(fetchData);
  const dispatch = useDispatch<any>();
  const [shippingAddress, setShippingAddress] = useState("");
  const [couponCode, setCouponCode] = useState(""); // Coupon code input value
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const couponApplied = couponCode === "DISCOUNT10"; // Example coupon code
  const [coupon, setCoupon] = useState<any>([]);
  const [address, setAddress] = useState([]);
  const [addressDefault, setAddressDefault] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(0);
  const [upload, setUpload] = useState<any>(null);

  const getTotalAmount = (couponId:number) => {
    const subtotal = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    let total = subtotal;
    let discount = couponId !== 0 ?  coupon.find((item:any) => item.couponId === couponId).couponDiscount : 0
    if (discount !== 0) {
      total = parseInt(total) - parseInt(discount) ;
      total = total < 0 ? 0 : total;
    }
    return total;
  };

  useEffect(() => {
    fetchCouponList();
    fetchAddressList();
  }, []);

  async function fetchCouponList() {
    let res = await getCouponUserList(user.id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setCoupon(res.data);
      }
    }
  }

  async function fetchAddressList() {
    let res = await getAddress(user.id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setAddress(res.data);
        const add = res.data.find((a: any) => a.is_default === 1);
        setAddressDefault(add);
      }
    }
  }

  async function saveOrder(values: any) {
    let res = await createOrder(values);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        dispatch(clearCart());
        dispatch(onReload(user.id));
        navigation.navigate("Cart");
      }
    }
  }

  const ChangeAddress = (id: number) => {
    const add = address.find((a: any) => a.id === id);
    setAddressDefault(add);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      base64: false,
      quality: 1,
      exif: true,
    });

    if (result.assets) {
      setUpload(result.assets[0]);
    }
  };

  return (
    <BottomSheetModalProvider>
      <Formik
        enableReinitialize={true}
        initialValues={{
          userId: user.id,
          addressId: addressDefault ? addressDefault.id : 0,
          paymentmethod: 1,
          couponId: 0,
          totalprice: 0 ,
          upload: upload,
          products: cartItems,
        }}
        onSubmit={(values) => {
          values.totalprice = getTotalAmount(values.couponId);
          saveOrder(values);
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <View style={styles.container}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="chevron-left-circle" size={28} color={colors.green} onPress={() => navigation.goBack()} />
              <Text style={styles.title}>ยืนยันการสั่งซื้อ</Text>
            </View>

            <Text style={styles.sectionTitle}>ที่อยู่จัดส่ง</Text>
            {address && addressDefault && (
              <AddressCard
                name={addressDefault?.name}
                address={`${addressDefault?.addressAt} ต.${tambon.find((val) => val.id === addressDefault?.subdistrict)?.name_th} อ.${amphure.find((val) => val.id === addressDefault?.district)?.name_th} จ.${province.find((val) => val.id === addressDefault?.province)?.name_th} ${addressDefault?.postcode}`}
                deleteButton={false}
                onPressEdit={() => {
                  setType(1);
                  setShowModal(!showModal);
                }}
              />
            )}

            <Text style={styles.sectionTitle}>เลือกช่องทางการชำระเงิน</Text>
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity style={[styles.paymentMethodOption, values.paymentmethod === 1 && styles.selectedPaymentMethodOption]} onPress={() => setFieldValue("paymentmethod", 1)}>
                <MaterialIcons name="payment" size={24} color="black" />
                <Text style={[styles.paymentMethodText, values.paymentmethod === 1 && { color: "#fff" }]}>ชำระเงินผ่านธนาคาร</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.paymentMethodOption, values.paymentmethod === 2 && styles.selectedPaymentMethodOption]} onPress={() => setFieldValue("paymentmethod", 2)}>
                <MaterialIcons name="payments" size={24} color="black" />
                <Text style={[styles.paymentMethodText, values.paymentmethod === 2 && { color: "#fff" }]}>ชำระเงินปลายทาง</Text>
              </TouchableOpacity>
            </View>

            {values.paymentmethod === 1 && (
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.uploadButton}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons name={upload ? "check-circle-outline" : "file-image-plus-outline"} size={28} color="black" />
                    <Text style={{ marginLeft: 10, fontFamily: "myFont" }}>{upload ? "อัพโหลดเรียบร้อย" : "อัพโหลดหลักฐานการชำระเงิน"}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            )}

            <View style={styles.orderSummaryContainer}>
              <Text style={styles.orderSummaryText}>รายละเอียด</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryItemText}>จำนวนสินค้า </Text>
                <Text style={styles.summaryItemValue}>{cartItems.length} รายการ</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryItemText}>ส่วนลด</Text>
                <Text style={styles.summaryItemValue}> {values.couponId === 0 ? 0 : coupon.find((item:any) => item.couponId === values.couponId).couponDiscount} บาท</Text>
              </View>
              {/* {couponApplied && (
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemText}>Coupon Applied:</Text>
                  <Text style={styles.summaryItemValue}>-{discount}%</Text>
                </View>
              )} */}
              <View style={styles.summaryItem}>
                <Text style={styles.summaryItemText}>รวมทั้งสิ้น</Text>
                <Text style={styles.summaryItemValue}>{getTotalAmount(values.couponId).toFixed(2)} บาท</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setType(2);
                setShowModal(!showModal);
              }}
            >
              <View style={styles.discountCoupon}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons name="ticket-percent-outline" size={28} color="black" />
                  <Text style={{ marginLeft: 10, fontFamily: "myFont" }}>เลือกคูปองส่วนลด</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => handleSubmit()}>
              <Text style={styles.checkoutButtonText}>ยืนยันการสั่งซื้อ</Text>
            </TouchableOpacity>

            <ModalBottomSheet isOpen={showModal} setIsOpen={setShowModal}>
              {type === 1 && (
                <View>
                  {address &&
                    address.map((item: any, index: number) => (
                      <AddressCard
                        key={index}
                        onPressEdit={() => {
                          ChangeAddress(item.id);
                          setShowModal(false);
                        }}
                        name={item.name}
                        address={`${item.addressAt} ต.${tambon.find((val) => val.id === item.subdistrict)?.name_th} อ.${amphure.find((val) => val.id === item.district)?.name_th} จ.${province.find((val) => val.id === item.province)?.name_th} ${item.postcode}`}
                        deleteButton={false}
                        colors={colors.backgroundInSide}
                      />
                    ))}
                </View>
              )}
              {type === 2 && (
                 <FlatList
                 keyExtractor={(key) => key.id}
                 data={coupon}
                 numColumns={1}
                 renderItem={({ item }) => (
                   <CouponCard
                     title={user.coupons.includes(item.couponId) ? "ใช้คูปอง" : "แลกคูปอง"}
                     points={item.points}
                     name={item.couponName}
                     expiry={item.expiredAt}
                     disable={user.isLogin === false}
                     onPress={() => {
                      setFieldValue("couponId",item.couponId);
                      setShowModal(false);
                     }}
                   />
                 )}
                 ListEmptyComponent={() => <Text style={styles.emptyText}>ไม่มีคูปองส่วนลด</Text>}
               />
              )}
            </ModalBottomSheet>
          </View>
        )}
      </Formik>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DCEEE4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#27A65D",
    fontFamily: "myFont",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#27A65D",
    fontFamily: "myFont",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  paymentMethodContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  paymentMethodOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  selectedPaymentMethodOption: {
    backgroundColor: "#27A65D",
    borderRadius: 5,
  },
  paymentMethodText: {
    fontFamily: "myFont",
    fontSize: 16,
    marginLeft: 5,
    color: colors.green,
  },
  orderSummaryContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  orderSummaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    fontFamily: "myFont",
  },
  summaryItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  summaryItemText: {
    flex: 1,
    fontSize: 16,
    color: "#27A65D",
    fontFamily: "myFont",
  },
  summaryItemValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.green,
    fontFamily: "myFont",
  },
  checkoutButton: {
    backgroundColor: "#27A65D",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "myFont",
  },
  discountCoupon: {
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  uploadButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    width: "75%",
    marginTop: 10,
  },
  emptyText: {
    fontFamily:"myFont",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  },
});
