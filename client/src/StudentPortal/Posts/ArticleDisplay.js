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
import Container from "@material-ui/core/Container";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: "auto",
    marginTop: "3%",
  },
  media: {
    height: 0,
    paddingTop: "40%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  mainCardContainer: {
    // border: "1px solid green",
    margin: "auto",
    width: "80%",
    marginTop: "3%",
  },
  heading: {
    fontFamily: " ",
    textAlign: "left",
    fontWeight: "bold",
    height: "10%",
    width: "80%",
    margin: "auto",
  },
  name: {
    textAlign: "left",
    // margin:'auto',
    // border: "1px solid blue",
    width: "fit-content",
  },
}));
const ArticleDisplay = ({ getPost, post: { post, loading }, match }) => {
  const classes = useStyles();
  useEffect(() => {
    getPost(match.params.id);

    console.log("Post Title", post.title);
  }, [getPost]);

  // const classes = useStyles();

  return loading == null ? (
    <Spinner />
  ) : (
    <Container maxWidth="xl">
      <div style={{ marginLeft: "-20px" }}>
        <Nav />
      </div>
      <Container maxWidth="lg" className={classes.mainCardContainer}>
        <Container>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              title={
                <Typography variant="h5" className={classes.name}>
                  {post.name}
                </Typography>
              }
              subheader={
                <Typography variant="p" className={classes.date}>
                  {new Date(post.date).toDateString()}
                </Typography>
              }
              action={
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              }
            />
            <CardMedia
              className={classes.media}
              image={post.image}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

ArticleDisplay.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(ArticleDisplay);
