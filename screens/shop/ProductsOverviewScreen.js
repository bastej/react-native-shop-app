import React from "react";
import { FlatList, Text } from "react-native";

import { useSelector } from "react-redux";

const ProductsOverviewScreen = () => {
  const products = useSelector(({ products }) => products.allProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.name}</Text>}
    />
  );
};

export default ProductsOverviewScreen;
