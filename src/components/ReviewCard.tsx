import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { Image } from "expo-image";

interface Props {
  review: Review;
}

interface Review {
  id: number;
  comment: string;
  rating: number;
  image?: string;
  name?: string;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.userInfo}>
          {review.image && <Image source={{ uri: review.image }} style={styles.userImage} />}
          <Text style={styles.userName}>คุณ{review.name}</Text>
        </View>
        <StarRating rating={review.rating} enableHalfStar={false} onChange={(e) => console.log(e)} />
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  comment: {
    fontSize: 16,
  },
});

export default ReviewCard;
