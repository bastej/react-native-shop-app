import React from "react";
import { View, Button, StyleSheet } from "react-native";
import PlainText from "../PlainText";
import Colors from "../../constants/colors";

const OrderItem = props => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <PlainText style={styles.totalAmount}>
          ${props.amount.toFixed(2)}
        </PlainText>
        <PlainText style={styles.date}>{props.date}</PlainText>
      </View>
      <Button color={Colors.lightBlue} title="Show Details" />
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
});

export default OrderItem;
