import { AsyncStorage, Alert } from "react-native";

import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import jwtDecode from "jwt-decode";

import { fbAppID } from "../../env";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const signUp = (email, password) => {
  const apiKey = "AIzaSyDsKJ88GoXR8nGue1fgpIC4dao3uVT_avU";

  return async dispatch => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
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
  const apiKey = "AIzaSyDsKJ88GoXR8nGue1fgpIC4dao3uVT_avU";

  return async dispatch => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
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
  await Facebook.initializeAsync(fbAppID);
  try {
    const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const responseJSON = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
      );
      const { name, id, picture } = await responseJSON.json();

      Alert.alert("Logged in!", `Hi ${name}!`);
      const expiryTimeInMS = parseInt(expires) * 1000;
      dispatch(authenticate(token, id, expiryTimeInMS, picture.data.url, name));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(token, id, expirationDate);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export const googleLogIn = () => async dispatch => {
  try {
    const { type, accessToken, user, idToken: token, ...rest } = await Google.logInAsync({
      iosClientId: `101042562428-h59d4tr3ojp2hhaplu0gv67abulj38kk.apps.googleusercontent.com`,
      androidClientId: `101042562428-qfhebh35omd3pbcvnrmd497dqh9fot0d.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    });

    if (type === "success") {
      const { name, exp: expires, picture: pictureUrl } = jwtDecode(token);

      Alert.alert("Logged in!", `Hi ${name}!`);
      const expiryTimeInMS = parseInt(expires) * 1000;
      dispatch(authenticate(token, id, expiryTimeInMS, pictureUrl, name));
      const expirationDate = new Date(new Date().getTime() + expiryTimeInMS);
      saveDataToStorage(token, id, expirationDate);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
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
