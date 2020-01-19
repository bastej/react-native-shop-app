import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import PlainText from "../../components/PlainText";
import Colors from "../../constants/Colors";

import * as productsActions from "../../store/actions/products";

const EditProductScreen = props => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.products.allProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(productId, title, imageUrl, description)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, imageUrl, description, +price)
      );
    }
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formItem}>
          <PlainText textWeight="bold" style={styles.label}>
            Image URL
          </PlainText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formItem}>
            <PlainText textWeight="bold" style={styles.label}>
              Price
            </PlainText>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formItem}>
          <PlainText textWeight="bold" style={styles.label}>
            Description
          </PlainText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
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
});

export default EditProductScreen;
