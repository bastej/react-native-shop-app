import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import PlainText from "../PlainText";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = ({ quantity, title, amount, onRemove, hideDeleteBtn }) => {
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
        <PlainText style={styles.itemDetails}>{amount && amount.toFixed(2)}</PlainText>
        {!hideDeleteBtn && (
          <TouchableOpacity
            onPress={onRemove}
            style={styles.deleteBtn}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={18}
              color="red"
            />
          </TouchableOpacity>
        )}
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
