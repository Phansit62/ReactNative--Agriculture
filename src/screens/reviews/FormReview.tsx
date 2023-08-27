import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FieldArray, Formik } from "formik";
import StarRating from "react-native-star-rating-widget";
import { Buttons } from "../../components/Buttons";
import colors from "../../helpers/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createReview, getReviewDetail } from "../../../services/Reviews.Service";
import { useSelector } from "react-redux";
import { fetchData, onReload } from "../../authentication/authSlice";
import { CustomTextInput } from "../../components/TextInputs";
import { Image } from "expo-image";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const FormReview = ({ navigation, route }: any) => {
  const [data, setData] = useState([]);
  const user = useSelector(fetchData);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (route.params && route.params.id) {
      FetchData(route.params.id);
    }
  }, [route.params]);

  async function FetchData(id: number) {
    let res = await getReviewDetail(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  async function Save(data: any) {
    let res = await createReview(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
          dispatch(onReload(user.id));
          navigation.goBack();
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{
          reviews: [
            ...data.map((val: any, index) => {
              return {
                id: val.id,
                productsId: val.productsId,
                comment: "",
                rating: 0,
                usersId: user.id,
                orderId:route.params.id
              };
            }),
          ],
        }}
        onSubmit={(values) => {
          const updatedReviews = values.reviews.map((review: any, index: number) => {
            const { productsId } = data[index];
            return {
              id: 0,
              productsId: productsId,
              comment: review.comment,
              rating: review.rating,
              usersId: user.id,
              orderId:route.params.id
            };
          });

          Save(updatedReviews);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View style={styles.container}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="chevron-left-circle" size={28} color={colors.green} onPress={() => navigation.goBack()} />
              <Text style={styles.title}>รีวิวสินค้า</Text>
            </View>

            <FieldArray
              name="reviews"
              render={(arrayHelpers) => (
                <View>
                  {data &&
                    data.map((item: any, index) => (
                      <View key={index}>
                        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          <Image
                            source={{
                              uri: item.image !== "" ? item.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
                            }}
                            contentFit="contain"
                            transition={800}
                            style={styles.image}
                          />
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                        <StarRating rating={values.reviews[index]?.rating || 0} onChange={(value) => setFieldValue(`reviews.${index}.rating`, value)} enableHalfStar={false} />
                        <Text style={{ marginBottom: 5 }}>แสดงความคิดเห็น</Text>
                        <TextInput
                          onChangeText={(e) => {
                            setFieldValue(`reviews.${index}.comment`, e);
                          }}
                          style={{ backgroundColor: "white", height: 100, textAlignVertical: "top", padding: 10, borderRadius: 15 }}
                          multiline={true}
                          numberOfLines={3}
                          value={values.reviews[index]?.comment || ""}
                        />
                      </View>
                    ))}
                </View>
              )}
            />
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Buttons title="บันทึก" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
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
    width: "65%",
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 25,
  },
  text: {
    fontFamily: "myFont",
    fontSize: 18,
  },
});

export default FormReview;
