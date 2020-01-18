import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import PlainText from "../PlainText";
import Colors from "../../constants/colors";
import CartItem from "./CartItem";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <PlainText style={styles.totalAmount}>
          ${props.amount.toFixed(2)}
        </PlainText>
        <PlainText style={styles.date}>{props.date}</PlainText>
      </View>
      <Button
        color={Colors.lightBlue}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.orderDetails}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.key}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              hideDeleteBtn
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: Colors.navyBlue,
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 16,
    color: "white",
  },
  date: {
    fontSize: 14,
    color: Colors.red,
  },
  orderDetails: {
    width: "100%",
  },
});

export default OrderItem;
