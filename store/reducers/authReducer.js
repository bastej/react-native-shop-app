import { SIGN_UP, LOG_IN } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    }
    case LOG_IN: {
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
