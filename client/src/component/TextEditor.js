import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { connect } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg';
import Button from '@material-ui/core/Button';
import { addArticle } from '../actions/post'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class TextEditor extends Component {

    state = { editorState: EditorState.createEmpty() }

    onChange = (editorState) => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        });
    }
    onPublish = () => {
        let content = (this.state.editorContentHtml)
        let id = (this.props.loggedInUserId)
        let data = {
            content, id
        }
        this.props.addArticle(data)
    }

    render() {
        return (

            <div id="textEditorDiv">
                <div>
                    <Editor
                        id="textEditorID"
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="editer-content"
                        onEditorStateChange={this.onChange}
                    />
                </div>

                <div id="editorPublishButton">
                    <Button onClick={this.onPublish} variant="contained">PUBLISH</Button>
                </div>
            </div>

        )
    }

}
const mapStateToProps = state => ({
    loggedInUserId: state.auth.user._id
})

export default connect(mapStateToProps, { addArticle })(TextEditor)
