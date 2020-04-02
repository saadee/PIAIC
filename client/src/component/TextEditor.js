import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { connect } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import Button from "@material-ui/core/Button";
import { addArticle } from "../actions/post";
import $ from "jquery";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

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
let category = ["General", "Social", "Medical", "Crisis", "Humor"];
class TextEditor extends Component {
  state = { editorState: EditorState.createEmpty(), image: "", category: "" };
  changeFileHandle = e => {
    const objectURL = e.target.files[0];
    if (objectURL.size > 30000) {
      alert("File size is too big!");
    }
    toDataURL(URL.createObjectURL(e.target.files[0]), dataUrl => {
      console.log("RESULT:", dataUrl);
      this.setState({ image: dataUrl });
    });
  };
  onCategory = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onChange = editorState => {
    this.setState({
      editorState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent())
    });
  };
  onPublish = () => {
    console.log("editor statee", this.state.category);

    let image = this.state.image;
    let content = this.state.editorContentHtml;
    let id = this.props.loggedInUserId;
    let ctg = this.state.category;
    console.log("checking");
    console.log($(this.state.editorContentHtml).find("h1").prevObject);
    let data = {
      title:
        $(this.state.editorContentHtml).find("h1").prevObject[0].innerText ||
        "Untitled Article",
      content,
      image,
      ctg,
      id
    };
    this.props.addArticle(data);
  };

  render() {
    return (
      <div id="textEditorDiv">
        <div
          style={{
            // border: "1px solid red",
            width: "1000px",
            height: "600px",
            overflow: "scroll",
            backgroundColor: "#C0C0C0",
            margin: "auto"
          }}
        >
          <Editor
            style={{ overflow: "scroll", border: "12px solid green" }}
            id="textEditorID"
            editorState={this.state.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="editer-content"
            onEditorStateChange={this.onChange}
            value="Begin Typing here"
          />
        </div>
        <div>
          <FormControl
            variant="filled"
            style={{
              width: "200px"
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="category"
              value={this.state.category}
              onChange={e => this.onCategory(e)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {category.map(cty => (
                <MenuItem value={cty}>{cty}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          className="editorUploadButton"
          style={{
            width: "fit-content",
            margin: "auto"
            // position: "absolute",
            // right: "10%",
            // top: "20%"
          }}
        >
          <input
            accept="image/*"
            className="editorUploadButton"
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
            name="User-Image"
            onChange={e => this.changeFileHandle(e)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </div>
        <div
          id="editorPublishButton"
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: "1rem"
            // position: "absolute",
            // right: "10%",
            // top: "30%"
          }}
        >
          <Button
            onClick={this.onPublish}
            variant="contained"
            color="secondary"
          >
            PUBLISH
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedInUserId: state.auth.user._id
});

export default connect(mapStateToProps, { addArticle })(TextEditor);
