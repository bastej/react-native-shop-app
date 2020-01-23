import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import PlainText from "../../components/PlainText";

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const products = useSelector(({ products }) => products.allProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.lightBlue} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <PlainText style={{ color: Colors.lightBlue }}>
          No products found :(
        </PlainText>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.centered}>
        <PlainText style={{ color: Colors.red }}>
          An error occurred :(
        </PlainText>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.lightBlue}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.lightBlue}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.lightBlue}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
