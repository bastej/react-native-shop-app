import React, { useState } from "react";
import { FlatList, Platform, Button, Alert, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";

import * as productsActions from "../../store/actions/products";
import PlainText from "../../components/PlainText";

const UserProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const products = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = itemId => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(itemId));
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.lightBlue} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.centered}>
        <PlainText style={{ color: Colors.red }}>An error occurred :(</PlainText>
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <PlainText style={{ color: Colors.lightBlue }}>No products found :(</PlainText>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.lightBlue}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.lightBlue}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export const UserProductsScreenNavOptions = navData => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserProductsScreen;
