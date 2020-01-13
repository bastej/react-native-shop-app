/**
 * Reusable Comp. that make easy to change font family for many Text Comp. in app
 *
 * textWeight determinate if font will be bold or regular (by default is regular)
 */

import React from "react";
import { Text, StyleSheet } from "react-native";

const PlainText = ({ children, style, textWeight = "regular", ...props }) => (
  <Text style={{ ...styles[textWeight], ...style }} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  regular: {
    fontFamily: "open-sans",
  },
  bold: {
    fontFamily: "open-sans-bold",
  },
});

export default PlainText;
