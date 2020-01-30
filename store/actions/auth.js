import { AsyncStorage } from "react-native";
import PlainText from "../../components/PlainText";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

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

      dispatch(authenticate(resData.idToken, resData.localId));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
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

      dispatch(authenticate(resData.idToken, resData.localId));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      throw err;
    }
  };
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

export const authenticate = (token, userId) => {
  return {
    type: AUTHENTICATE,
    payload: { token, userId },
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");

  return {
    type: LOGOUT,
  };
};
