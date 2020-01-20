import React, { useCallback, useEffect, useReducer } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import PlainText from "../../components/PlainText";
import Colors from "../../constants/Colors";

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

  const textChangeHandler = (name, value) => {
    let isValid = false;
    if (value.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value,
      isValid,
      name,
    });
  };

  const { title, imageUrl, description, price } = formState.inputValues;

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <PlainText textWeight="bold" style={styles.label}>
            Title
          </PlainText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={value => textChangeHandler("title", value)}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!title && (
            <PlainText style={styles.errorMessage}>
              Please enter a valid title
            </PlainText>
          )}
        </View>
        <View style={styles.formItem}>
          <PlainText textWeight="bold" style={styles.label}>
            Image URL
          </PlainText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={value => textChangeHandler("imageUrl", value)}
          />
          {!imageUrl && (
            <PlainText style={styles.errorMessage}>
              Please enter a image url
            </PlainText>
          )}
        </View>
        {editedProduct ? null : (
          <View style={styles.formItem}>
            <PlainText textWeight="bold" style={styles.label}>
              Price
            </PlainText>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={value => textChangeHandler("price", value)}
              keyboardType="decimal-pad"
            />
            {!price && (
              <PlainText style={styles.errorMessage}>
                Please enter a valid price
              </PlainText>
            )}
          </View>
        )}
        <View style={styles.formItem}>
          <PlainText textWeight="bold" style={styles.label}>
            Description
          </PlainText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={value => textChangeHandler("description", value)}
          />
          {!description && (
            <PlainText style={styles.errorMessage}>
              Please enter a valid description
            </PlainText>
          )}
        </View>
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
  formItem: {
    width: "100%",
  },
  label: { color: Colors.lightBlue, marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 14,
  },
});

export default EditProductScreen;
