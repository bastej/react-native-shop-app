import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import PlainText from "../PlainText";
import Colors from "../../constants/colors";

const ProductItem = ({ image, title, price, onViewDetail, onAddToCart }) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.details}>
        <PlainText textWeight="bold" style={styles.title}>
          {title}
        </PlainText>
        <PlainText style={styles.price}>${price.toFixed(2)}</PlainText>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          color={Colors.lightBlue}
          title="View Details"
          onPress={onViewDetail}
        />
        <Button
          color={Colors.lightBlue}
          title="To Cart"
          onPress={onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.navyBlue,
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    color: "white",
  },
  price: {
    fontSize: 14,
    color: Colors.red,
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15,
  },
});

export default ProductItem;
