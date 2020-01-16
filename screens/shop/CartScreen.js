import React from "react";

import map from "lodash/map";

import { View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import PlainText from "../../components/PlainText";
import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    // transforming into array with lodash
    const itemsArray = map(state.cart.items, item => item);
    return itemsArray;
  });

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
        />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item: { quantity, productTitle, sum } }) => (
          <CartItem
            title={productTitle}
            quantity={quantity}
            amount={sum}
            onRemove={() => {}}
          />
        )}
      />
    </View>
  );
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
