import { AsyncStorage, Alert } from "react-native";

import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import jwtDecode from "jwt-decode";
import firebase from "../../utils/firebase";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;
const firebaseApiKey = Expo.Constants.manifest.extra.firebase.apiKey;

export const signUp = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        const errorId = resData.error.message;
        let errorMessage = "Something went wrong!";
        if (errorId === "EMAIL_EXISTS") {
          errorMessage = "This email exists already!";
        }
        throw new Error(errorMessage);
      }
      const expiryTimeInMS = parseInt(resData.expiresIn) * 1000;
      dispatch(authenticate(resData.idToken, resData.localId, expiryTimeInMS));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      throw err;
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        const errorId = resData.error.message;
        let errorMessage = "Something went wrong!";
        if (errorId === "EMAIL_NOT_FOUND") {
          errorMessage = "This email could not be found!";
        } else if (errorId === "INVALID_PASSWORD") {
          errorMessage = "This password id not valid!";
        }
        throw new Error(errorMessage);
      }

      const expiryTimeInMS = parseInt(resData.expiresIn) * 1000;
      dispatch(authenticate(resData.idToken, resData.localId, expiryTimeInMS));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      throw err;
    }
  };
};

export const facebookLogIn = () => async dispatch => {
  const fbAppId = Expo.Constants.manifest.extra.facebook.appId;

  await Facebook.initializeAsync(fbAppId);
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbAppId, {
      permissions: ["public_profile", "email"],
    });

    if (type === "success") {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const credential = await firebase.auth.FacebookAuthProvider.credential(token);
      const { user } = await firebase.auth().signInWithCredential(credential);
      const jwtToken = await user.getIdToken();
      const { exp: expires, name } = jwtDecode(jwtToken);

      Alert.alert("Logged in!", `Hi ${name}!`);
      const expiryTimeInMS = parseInt(expires) * 1000;
      dispatch(authenticate(jwtToken, user.uid, expiryTimeInMS, user.photoURL, name));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(token, user.uid, expirationDate);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    console.error(message);
    alert(`Facebook Login Error: ${message}`);
  }
};

export const googleLogIn = () => async dispatch => {
  try {
    const { type, idToken, accessToken } = await Google.logInAsync({
      iosClientId: `101042562428-h59d4tr3ojp2hhaplu0gv67abulj38kk.apps.googleusercontent.com`,
      androidClientId: `101042562428-qfhebh35omd3pbcvnrmd497dqh9fot0d.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    });

    if (type === "success") {
      const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      const { user } = await firebase.auth().signInWithCredential(credential);
      const jwtToken = await user.getIdToken();
      const { exp: expires, name } = jwtDecode(jwtToken);

      Alert.alert("Logged in!", `Hi ${name}!`);
      const expiryTimeInMS = parseInt(expires) * 1000;
      dispatch(authenticate(jwtToken, user.uid, expiryTimeInMS, user.photoURL, name));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(jwtToken, user.uid, expirationDate);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    console.error(message);
    Alert.alert(`Google Login Error: ${message}`);
  }
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const authenticate = (token, userId, expiryDate, imageUrl, userName) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryDate));
    dispatch({ type: AUTHENTICATE, payload: { token, userId, imageUrl, userName } });
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  clearLogoutTimer();

  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate);
  };
};

export const setDidTryAL = () => ({
  type: SET_DID_TRY_AL,
});
