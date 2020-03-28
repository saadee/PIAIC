import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/post";
import img from "./dummy.png";
import { getCurrentProfile } from "../../actions/profile";
import Nav from "./appbar";
import Spinner from "../DashBoard/userProfile/spinner";
import { getPost } from "../../actions/post";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    margin: "auto"
  },
  title: {
    fontFamily: "Times New Roman",
    color: "black",
    fontWeight: "bold",
    letterSpacing: "5px",
    // fontSize: "1.2rem",
    padding: "10px",
    margin: "auto",
    background:
      "linear-gradient(0deg, rgba(214,231,219,0.46262254901960786) 0%, rgba(156,193,156,0.927608543417367) 100%)"

    // border: "1px solid red"
  },
  ArticleDisplayMain: {
    // display: "flex",
    margin: "auto"
  },
  author: {
    fontSize: "20px",
    color: "black",
    fontWeight: "bold"
  },
  ArticleDisplayChild: {
    marginTop: "20px"
  },
  media: {
    height: "0px",
    width: "800px",
    paddingTop: "30% ",
    // marginLeft: "20px"
    margin: "auto"
  },
  imageDiv: {
    // width: "fit-content"
    // border: "5px solid green",
    margin: "auto"
  },
  content: {
    // border: "3px solid grey",
    width: "900px",
    height: "500px",
    // overflow: "Hidden",
    marginTop: "20px",
    margin: "auto",
    fontFamily: "georgia",
    textAlign: "justify"
  },
  contentDiv: {
    // display: "flex",
    flexWrap: "wrap"
    // margin: "20px"
  },
  authorDiv: {},
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const ArticleDisplay = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);

    console.log("Post Title", post.title);
  }, [getPost]);

  const classes = useStyles();

  return (
    <div className={classes.ArticleDisplayMain}>
      <Nav />
      <div className={classes.ArticleDisplayChild}>
        <Card className={classes.root}>
          <Typography variant="h3" component="h4" className={classes.title}>
            {/* This is Title */}
            {post.title}
          </Typography>
          <CardHeader
            className={classes.card}
            // avatar={
            //   <Avatar
            //     aria-label="recipe"
            //     src={user.profile.image}
            //     className={classes.avatar}
            //   ></Avatar>
            // }
            // subheader={new Date(post.date).toDateString()}
          />

          <div className={classes.contentDiv}>
            <div className={classes.imageDiv}>
              <CardMedia
                className={classes.media}
                image={!post.image ? img : post.image}
              />
            </div>
            <CardContent className={classes.content}>
              <Typography variant="body1" color="textPrimary" component="p">
                <center>
                  <div className={classes.authorDiv}>
                    <span className={classes.author}>
                      {/* Author : {user.email} */}
                    </span>
                  </div>
                </center>
                <hr />
                {post.content}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

ArticleDisplay.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPost })(ArticleDisplay);
