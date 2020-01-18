import React from "react";

import map from "lodash/map";

import { View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlainText from "../../components/PlainText";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    // transforming into array with lodash
    const itemsArray = map(state.cart.items, item => item);
    return itemsArray;
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <PlainText style={styles.summaryText}>
          Total:{" "}
          <PlainText style={styles.amount}>
            ${cartTotalAmount.toFixed(2)}
          </PlainText>
        </PlainText>
        <Button
          color={Colors.lightBlue}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
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
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: Colors.navyBlue,
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
