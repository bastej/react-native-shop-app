import React, { useState } from "react";

import map from "lodash/map";

import {
  View,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlainText from "../../components/PlainText";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    // transforming into array with lodash
    const itemsArray = map(state.cart.items, item => item);
    return itemsArray;
  });

  const dispatch = useDispatch();

  const addOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <PlainText style={styles.summaryText}>
          Total:{" "}
          <PlainText style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </PlainText>
        </PlainText>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.lightBlue} />
        ) : (
          <Button
            color={Colors.lightBlue}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={addOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        renderItem={({ item: { key, quantity, productTitle, sum } }) => (
          <CartItem
            title={productTitle}
            quantity={quantity}
            amount={sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(key));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    color: "white",
    fontSize: 18,
  },
  amount: {
    color: Colors.blue,
  },
});

export default CartScreen;
