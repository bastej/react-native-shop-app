import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const jsonUserData = await AsyncStorage.getItem("userData");
      if (!jsonUserData) {
        props.navigation.navigate("Auth");
        return;
      }
      const { token, userId, expiryDate } = JSON.parse(jsonUserData);

      if (new Date(expiryDate) <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(token, userId));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.navyBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
