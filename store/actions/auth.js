import { AsyncStorage } from "react-native";

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

export const authenticate = (token, userId, expiryDate) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryDate));
    dispatch({ type: AUTHENTICATE, payload: { token, userId } });
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
