import React from "react";
import { View, Image, Button, StyleSheet, ScrollView } from "react-native";
import PlainText from "../../components/PlainText";

import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.allProducts.find(prod => prod.id === productId)
  );

  return (
    <View>
      <PlainText style={styles.text}>
        {selectedProduct.title} {productId}
      </PlainText>
    </View>
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
});

export default ProductDetailScreen;
