export const CREATE_COMMENT = "CREATE_COMMENT";

export const createComment = (commentData) => ({
  type: CREATE_COMMENT,
  payload: commentData,
});
