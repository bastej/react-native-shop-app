import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View, ActivityIndicator, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

import * as ordersActions from "../../store/actions/orders";
import PlainText from "../../components/PlainText";
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = async () => {
    setHasError(false);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

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
        <Button title="Try again" onPress={loadOrders} color={Colors.lightBlue} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <PlainText style={{ color: Colors.lightBlue }}>No orders found :(</PlainText>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const OrdersScreenNavOptions = navData => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrdersScreen;
