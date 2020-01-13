import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/colors";

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.red,
      },
      headerTintColor: Colors.navyBlue,
    },
    cardStyle: {
      backgroundColor: Colors.navyBlue,
    },
  }
);

export default createAppContainer(ProductNavigator);
