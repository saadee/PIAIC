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
import { getCurrentProfile } from "../../actions/profile";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    margin: "auto"
  },
  title: {
    fontFamily: "courier",
    // marginTop: "10px",
    padding: "2px",
    background:
      "linear-gradient(0deg, rgba(214,231,219,0.46262254901960786) 0%, rgba(156,193,156,0.927608543417367) 100%)"
    // border: "1px solid red"
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
    width: "fit-content"
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

  return (
    <div className={classes.ArticleCardMain}>
      {posts.map(post => (
        <div className={classes.ArticleCardChild} key={post._id}>
          <Card className={classes.root}>
            <Typography
              variant="h4"
              color="grey"
              component="h4"
              className={classes.title}
            >
              {post.title}
            </Typography>
            <Typography>{post._id}</Typography>
            <CardHeader
              className={classes.card}
              // avatar={
              //   <Avatar
              //     aria-label="recipe"
              //     src={user.profile.image}
              //     className={classes.avatar}
              //   ></Avatar>
              // }
              subheader={new Date(post.date).toDateString()}
            />

            <div className={classes.contentDiv}>
              <div className={classes.imageDiv}>
                <CardMedia
                  className={classes.media}
                  image={!post.image ? img : post.image}
                />
              </div>
              <CardContent className={classes.content}>
                {!isAuthenticated ? (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Login To See the user
                  </Typography>
                ) : (
                  <Typography
                    className={classes.dec}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Auhtor : {user.email}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                    quod eligendi vero in molestias cum, aliquam culpa sed odio
                    hic. Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptates ut quibusdam cupiditate esse a. Tempora
                    distinctio quis maiores vitae, quas quidem ea aliquam velit
                    unde explicabo aut tempore accusantium. Amet, atque veniam
                    quasi totam nulla molestias doloremque nostrum explicabo
                    similique. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Sunt, odit. Incidunt numquam laudantium
                    ipsa, molestiae molestias consequuntur provident explicabo
                    officiis dolore, maiores accusamus doloremque tempore
                    pariatur nisi dicta doloribus soluta obcaecati facilis
                    veritatis odio voluptates. Obcaecati velit harum dolorem
                    doloremque. Quia labore aperiam iste aliquam molestias
                    voluptatibus debitis sunt nihil dolore culpa! Eos explicabo
                    saepe commodi magnam quam ipsam, minus cumque sint, omnis
                    sed dolorum et eveniet alias ex harum?
                  </Typography>
                )}
              </CardContent>
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
