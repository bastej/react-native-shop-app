import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/colors";

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
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
