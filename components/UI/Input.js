import React, { useReducer, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import PlainText from "../PlainText";

import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }
    default: {
      return state;
    }
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, name } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(name, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, name]);

  const textChangeHandler = value => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && value.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(value.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +value < props.min) {
      isValid = false;
    }
    if (props.max != null && +value > props.max) {
      isValid = false;
    }
    if (props.minLength != null && value.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formItem}>
      <PlainText textWeight="bold" style={styles.label}>
        {props.label}
      </PlainText>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <PlainText style={styles.errorMessage}>{props.errorMessage}</PlainText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Input;
