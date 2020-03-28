import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100vw"
  },
  input: {
    display: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    letterSpacing: "1rem",
    fontFamily: "serif"
  }
}));

// base64 code

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

const AddPost = ({ addPost, isAuthenticated }) => {
  const classes = useStyles();

  const [title, setTitle] = useState({ title: "", image: "" });
  const [content, setContent] = useState({ content: "" });

  const onChange = e => {
    setTitle({ ...title, ["title"]: e.target.value });
  };
  const changeFileHandle = e => {
    const objectURL = e.target.files[0];
    // if (objectURL.size > 700000) {
    //   alert("File size is too big!");
    // }
    // setFormData({ ...formData, image: objectURL })

    toDataURL(URL.createObjectURL(e.target.files[0]), function(dataUrl) {
      console.log("RESULT:", dataUrl);
      setTitle({ ...title, image: dataUrl });
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    setTitle({
      ...title,
      content: content
    });
    addPost(title);
    console.log(title);
  };
  if (!isAuthenticated) {
    return <Redirect to="/signup" />;
  }
  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundImage: "-webkit-linear-gradient(right,#08383d,#01645f)",
          backgroundImage: "linear-gradient(270deg,#08383d,#01645f)"
        }}
      >
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Write an Article
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          marginTop: "20px"
        }}
      >
        <form onSubmit={e => onSubmit(e)}>
          <TextField
            style={{
              width: "500px",
              margin: "10px"
            }}
            required
            id="standard-required"
            label="Enter Title"
            variant="outlined"
            placeholder="Enter The Title of your Article"
            name="title"
            value={title.title}
            onChange={e => onChange(e)}
          />
          <br />
          <TextareaAutosize
            style={{
              width: "700px",
              height: "400px"
            }}
            name="name"
            value={title.content}
            onChange={e => setContent(e.target.value)}
            aria-label="empty textarea"
            placeholder="Paste your Content Here"
          />{" "}
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="User-Image"
              onChange={changeFileHandle}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>
          <br />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
          >
            Post Article
          </Button>
        </form>
      </div>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { addPost })(AddPost);
