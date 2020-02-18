import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  imageUrl: null,
  userName: null,
  didTryAutoLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        didTryAutoLogin: true,
        imageUrl: action.payload.imageUrl,
        userName: action.payload.userName,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    }
    case SET_DID_TRY_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
