import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import { Platform, View, SafeAreaView, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { ListItem, Avatar, Button } from "react-native-elements";

import ProductsOverviewScreen, {
  ProductsOverviewScreenNavOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  ProductDetailScreenNavOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { CartScreenNavOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { OrdersScreenNavOptions } from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  UserProductsScreenNavOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, { EditProductScreenNavOptions } from "../screens/user/EditProductScreen";
import AuthScreen, { AuthScreenNavOptions } from "../screens/user/AuthScreen";

import Colors from "../constants/Colors";

import * as authActions from "../store/actions/auth";
import PlainText from "../components/PlainText";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.red,
  },
  headerTintColor: Colors.navyBlue,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  cardStyle: {
    backgroundColor: Colors.navyBlue,
  },
};

const ProductsStackNavigator = createStackNavigator();

export const ProductNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenNavOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailScreenNavOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={CartScreenNavOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={OrdersScreenNavOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UserProductsScreenNavOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductScreenNavOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthScreenNavOptions} />
  </AuthStackNavigator.Navigator>
);

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  const { imageUrl, userName } = useSelector(state => state.auth);

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title=" Logout"
                buttonStyle={{ backgroundColor: Colors.blue }}
                color={Colors.blue}
                icon={
                  <Ionicons
                    name={Platform.OS === "android" ? "md-power" : "ios-power"}
                    size={18}
                    color={Platform.OS === "android" ? "white" : Colors.blue}
                  />
                }
                type={Platform.OS === "android" ? "solid" : "clear"}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.navyBlue,
        activeBackgroundColor: Colors.lightBlue,
        inactiveTintColor: "white",
      }}
      drawerStyle={{ backgroundColor: Colors.navyBlue }}
    >
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => {
            return imageUrl ? (
              <Avatar
                size="small"
                rounded
                source={{
                  uri: imageUrl,
                }}
                containerStyle={{ padding: 0 }}
              />
            ) : (
              <Ionicons
                name={Platform.OS === "android" ? "md-person" : "ios-person"}
                size={23}
                color={props.color}
              />
            );
          },
          ...(userName
            ? {
                drawerLabel: props => (
                  <PlainText style={{ color: props.color }}>{userName}</PlainText>
                ),
              }
            : {}),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
