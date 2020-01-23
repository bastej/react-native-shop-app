export const SIGN_UP = "SIGN_UP";

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

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      console.log(resData);

      dispatch({ type: SIGN_UP });
    } catch (err) {
      throw err;
    }
  };
};
