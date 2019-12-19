import React from "react";
import { FlatList, Text } from "react-native";

import { useSelector } from "react-redux";

const ProductsOverviewScreen = () => {
  const products = useSelector(({ products }) => products.allProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Text style={{ color: "white" }}>{itemData.item.title}</Text>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "Products",
};

export default ProductsOverviewScreen;
