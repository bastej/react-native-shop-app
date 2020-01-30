import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
