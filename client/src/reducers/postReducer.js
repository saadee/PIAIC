const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case "GET_POST":
      return {
        ...state,
        post: payload,
        loading: false
      };
    case "ADD_POSTS":
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case "POSTS_ERR":
      return {
        ...state,
        error: payload,
        loading: false
      };
    case "ADD_ARTICLE":
      console.log(payload);
      return {
        ...state,
        posts: payload,
        loading: false
      };
    default:
      return state;
  }
}
