import React, { useCallback, useEffect, useReducer } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

import * as productsActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
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
  return state;
};

const EditProductScreen = props => {
  const productId = props.navigation.getParam("productId");
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

  const submitHandler = useCallback(() => {
    const { title, imageUrl, description, price } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(productId, title, imageUrl, description)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, imageUrl, description, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
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

  return (
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
  );
};

EditProductScreen.navigationOptions = navData => {
  const isEditScreen = navData.navigation.getParam("productId");
  const submitAction = navData.navigation.getParam("submit");

  return {
    headerTitle: isEditScreen ? "Edit Product" : "Create Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={isEditScreen ? "Save" : "Create"}
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitAction}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
