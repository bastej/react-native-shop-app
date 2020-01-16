import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import PlainText from "../PlainText";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const CartItem = ({ quantity, title, amount, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <PlainText textWeight="bold" style={styles.itemDetails}>
          {`${quantity}x `}
        </PlainText>
        <PlainText textWeight="bold" style={styles.title}>
          {title}
        </PlainText>
      </View>
      <View style={styles.itemData}>
        <PlainText style={styles.itemDetails}>{amount.toFixed(2)}</PlainText>
        <TouchableOpacity onPress={onRemove} style={styles.deleteBtn}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={16}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetails: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    color: Colors.lightBlue,
  },
  deleteBtn: {
    marginLeft: 20,
  },
});

export default CartItem;
