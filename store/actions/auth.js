export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

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

      console.log(resData);

      dispatch({
        type: SIGN_UP,
        payload: {
          token: resData.idToken,
          userId: resData.localId,
        },
      });
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

      console.log(resData);

      dispatch({
        type: LOG_IN,
        payload: {
          token: resData.idToken,
          userId: resData.localId,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
