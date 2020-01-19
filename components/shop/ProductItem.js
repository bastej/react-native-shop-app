import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import PlainText from "../PlainText";
import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const ProductItem = ({
  image,
  title,
  price,
  onSelect,
  onAddToCart,
  ...props
}) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchableContainer}>
        <TouchableComp onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.details}>
              <PlainText textWeight="bold" style={styles.title}>
                {title}
              </PlainText>
              <PlainText style={styles.price}>${price.toFixed(2)}</PlainText>
            </View>
            <View style={styles.buttonsContainer}>{props.children}</View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  touchableContainer: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "55%",
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
