import axios from "axios";

// get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("api/posts");

    dispatch({
      type: "GET_POSTS",
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: "POSTS_ERR",
      payload: { msg: err.message }
    });
  }
};
// get pos
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: "GET_POST",
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: "POSTS_ERR",
      payload: { msg: err.message }
    });
  }
};

// Create posts
export const addPost = ({ title, content, image }) => async dispatch => {
  let fData = new FormData();
  fData.append("name", title);
  fData.append("content", content);
  fData.append("image", image);
  try {
    const res = await axios.post("api/posts", fData);

    dispatch({
      type: "ADD_POSTS",
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: "POSTS_ERR",
      payload: { msg: err.message }
    });
  }
};

export const addArticle = data => async dispatch => {
  try {
    const res = await axios.post("/api/posts", data);
    dispatch({
      type: "ADD_ARTICLE",
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};
