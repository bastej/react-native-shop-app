import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";

import { Platform, Button, View, SafeAreaView } from "react-native";

import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

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

// const ProductNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );

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

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );

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

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.blue}
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
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
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
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.navyBlue,
//       activeBackgroundColor: Colors.lightBlue,
//       inactiveTintColor: "white",
//     },
//     drawerBackgroundColor: Colors.navyBlue,
//     contentComponent: props => {
//       const dispatch = useDispatch();

//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItemList {...props} />
//             <Button
//               title="Logout"
//               color={Colors.blue}
//               onPress={() => {
//                 dispatch(authActions.logout());
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
    <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthScreenNavOptions} />
  </AuthStackNavigator.Navigator>
);

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
