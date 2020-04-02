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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/post";
import img from "./dummy.png";
import { Editor } from "react-draft-wysiwyg";
import { getCurrentProfile } from "../../actions/profile";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 750,
    maxHeight: 300
    // margin: "auto"
  },
  title: {
    fontFamily: "courier",
    // marginTop: "10px",
    // padding: "2px"
    fontSize: "10px",
    marginTop: "0px",
    border: "1px solid red"
  },
  ArticleCardMain: {
    // display: "flex",
    margin: "auto"
  },
  ArticleCardChild: {
    marginTop: "20px"
  },
  media: {
    height: "150px",
    width: "200px",
    paddingTop: "30.25%" // 16:9,
    // marginLeft: "20px"
  },
  imageDiv: {
    width: "fit-content",

    display: "flex"
    // border: "1px solid green"
  },
  content: {
    // border: "1px solid red",
    width: "400px",
    height: "200px",
    overflow: "Hidden",
    margin: "auto"
  },
  contentDiv: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  dec: {
    textAlign: "justify"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const ArticleCard = ({
  getPosts,
  post: { posts, loading, _id },
  user,
  getCurrentProfile,
  isAuthenticated
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getPosts]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = e => {
    setExpanded(!expanded);
  };
  // let a= posts.content
  // const convertCommentFromJSONToHTML = a => {
  //   return stateToHTML(convertFromRaw(JSON.parse(a)));
  // // };
  // var d = document.getElementById("hu");
  // console.log(d.outerHTML);

  return (
    <div className={classes.ArticleCardMain}>
      {posts.map(post => (
        <div className={classes.ArticleCardChild} key={post._id}>
          <Card className={classes.root}>
            <div className={classes.contentDiv}>
              <div className={classes.imageDiv}>
                <CardMedia
                  className={classes.media}
                  image={!post.image ? img : post.image}
                />
                <Typography
                  id="hu"
                  variant="h5"
                  color="grey"
                  component="p"
                  className={classes.title}
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Typography>
              </div>
              <CardContent className={classes.content}></CardContent>
            </div>
            <CardActions disableSpacing>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  float: "right",
                  // border: "1px solid red",
                  marginLeft: "520px"
                }}
              >
                Click To see more
              </Typography>
              <Link to={`/aritcle/${post._id}`} className="link">
                <IconButton>
                  <OpenInNewIcon />
                </IconButton>
              </Link>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Author:{post.name}</Typography>
                <Typography paragraph>{post.content}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </div>
  );
};

ArticleCard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getPosts, getCurrentProfile })(
  ArticleCard
);
