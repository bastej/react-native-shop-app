import React from "react";
import { View, Image, Button, StyleSheet, ScrollView } from "react-native";
import PlainText from "../../components/PlainText";

import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.allProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.lightBlue}
          title="Add to card"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <PlainText style={styles.price}>
        {selectedProduct.price.toFixed(2)}
      </PlainText>
      <PlainText style={styles.description}>
        {selectedProduct.description}
      </PlainText>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  image: {
    width: "100%",
    height: 300,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: Colors.blue,
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
