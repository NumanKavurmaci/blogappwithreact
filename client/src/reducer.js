import { CREATE_COMMENT } from "./actionTypes";

export const initialState = {
  user: null,
  comments: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
