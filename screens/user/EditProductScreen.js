import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import get from "lodash/get";

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedInputValues = {
        ...state.inputValues,
        [action.name]: action.value,
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.name]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
      }

      return {
        ...state,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid: updatedFormIsValid,
      };
    }
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const productId = get(props, "route.params.productId");
  const editedProduct = useSelector(state =>
    state.products.allProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (hasError) {
      Alert.alert("An error occurred!");
    }
  }, [hasError]);

  const submitHandler = useCallback(async () => {
    const { title, imageUrl, description, price } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [{ text: "Okay" }]);
      return;
    }
    setHasError(false);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(productsActions.updateProduct(productId, title, imageUrl, description));
      } else {
        await dispatch(productsActions.createProduct(title, imageUrl, description, +price));
      }
      props.navigation.goBack();
    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title={"Create"}
            // title={isEditScreen ? "Save" : "Create"}
            iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  // below method's logic doesn't change so useCallback has been used
  // to avoid unnecessary method rebuild
  const inputChangeHandler = useCallback(
    (name, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        name,
      });
    },
    [dispatchFormState]
  );

  const { title, imageUrl, description, price } = formState.inputValues;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.lightBlue} />
      </View>
    );
  }

  return (
    // TOFIX: on iOS keyboard still cover active input
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            name="title"
            value={title}
            errorMessage="Please enter a valid title"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={title}
            initiallyValid={!!title}
            required
          />
          <Input
            label="Image Url"
            name="imageUrl"
            value={imageUrl}
            errorMessage="Please enter a image url"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={imageUrl}
            initiallyValid={!!imageUrl}
            required
          />
          {editedProduct ? null : (
            <Input
              label="Price"
              name="price"
              value={price}
              errorMessage="Please enter a valid price"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              keyboardType="decimal-pad"
              required
              min={0.1}
            />
          )}
          <Input
            label="Description"
            name="description"
            value={description}
            errorMessage="Please enter a valid description"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            autoCapitalize="sentences"
            autoCorrect
            multiline
            // props works just on android
            numberOfLines={3}
            initialValue={description}
            initiallyValid={!!description}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const EditProductScreenNavOptions = navData => {
  const isEditScreen = get(navData, "route.params.productId");

  return {
    headerTitle: isEditScreen ? "Edit Product" : "Create Product",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default EditProductScreen;
