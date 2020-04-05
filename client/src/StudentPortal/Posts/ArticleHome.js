import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Appbar from "./appbar";
import Typography from "@material-ui/core/Typography";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import img from "./dummy.png";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import lizard from "./i.jpg";
import { fadeIn } from "react-animations";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
  },
  root1: {
    maxWidth: 290,
    // width:'fit-content'
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    margin: "0.5rem",
    maxWidth: 500,
  },
  image: {
    width: 130,
    height: 130,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  img1: {
    display: "inline",
    width: "fit-content",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  paper1: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: "center",
    margin: "0.5rem",
  },
  gridParent: {
    margin: "auto",
    // margin:'1rem'
    // padding: "1rem"
  },
  gridFlex: {
    display: "flex",
    marginLeft: "50px",
    // border: "1px solid red"
  },
  gridFlexs: {
    margin: "auto",
    display: "flex",
  },
  ReadingB: {
    textAlign: "left",
  },
  card: {
    display: "flex",
    maxWidth: 750,
    maxHeight: 300,
    margin: "auto",
  },
  title: {
    fontWeight: "bold",
    fontSize: "25px",

    // textAlign: "left"
  },
  description: {
    textAlign: "justfy",
    margin: "1rem",
    padding: "1rem",
  },
  author: {
    margin: "10px",
    textAlign: "left",
  },
  mediaDiv: {
    margin: "10px",
  },
  media: {
    height: "90px",
    width: "150px",
    paddingTop: "30.25%", // 16:9,
    // marginLeft: "20px",
    border: "1px solid red",
  },
}));

const ArticleHome = ({
  getPosts,
  post: { posts, loading, _id },
  user,
  getCurrentProfile,
  isAuthenticated,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getPosts]);
  const classes = useStyles();
  console.log("hey", posts[0]);
  const Medical = [];
  const Social = [];
  const General = [];
  const Crisis = [];
  const Humor = [];

  posts.map((post) => {
    if (post.category == "Medical") {
      Medical.push(post);
    }
  });
  posts.map((post) => {
    if (post.category == "Social") {
      Social.push(post);
    }
  });
  posts.map((post) => {
    if (post.category == "General") {
      General.push(post);
    }
  });
  posts.map((post) => {
    if (post.category == "Crisis") {
      Crisis.push(post);
    }
  });
  posts.map((post) => {
    if (post.category == "Humor") {
      Humor.push(post);
    }
  });
  console.log("Medical", Medical);
  return (
    <div className={classes.root}>
      <Appbar />

      <Grid container spacing={3} className={classes.gridParent}>
        <Grid item xs={12}></Grid>
        <Grid item xs={6} style={{ marginLeft: "0.5rem" }}>
          <Card className="animated zoomIn">
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                backgroundSize="cover"
                image={General.length ? General[0].image : img}
              />
              <CardContent>
                <Typography
                  style={{
                    maxHeight: "120px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: General.length ? General[0].content : "",
                    }}
                  />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link
                to={`/aritcle/${General.length ? General[0]._id : General._id}`}
                className="link"
              >
                <IconButton>
                  {" "}
                  <span style={{ fontSize: "15px" }}>See More</span>
                  <OpenInNewIcon
                    style={{
                      float: "right",
                    }}
                  />
                </IconButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          xs={5}
          style={{
            height: "400px",
            width: "200px",
            marginLeft: "0rem",
            overflow: "scroll",
            overflowX: "hidden" /* Hide horizontal scrollbar */,
          }}
        >
          {General.slice(1).map((post) => (
            <div className={classes.root} className="animated fadeIn delay-1s">
              <Paper className={classes.paper} style={{ marginLeft: "0.5rem" }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={!post.image ? img : post.image}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          variant="h5"
                          gutterBottom
                          style={{
                            // border: "1px solid red",
                            maxHeight: "200px",
                            maxWidth: "340px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.title,
                            }}
                          />
                        </Typography>{" "}
                        <Typography variant="p" color="secondary">
                          {" "}
                          <span style={{ color: "black" }}>Author:</span>{" "}
                          {post.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link to={`/aritcle/${post._id}`} className="link">
                          <IconButton>
                            {" "}
                            <span style={{ fontSize: "15px" }}>See More</span>
                            <OpenInNewIcon
                              style={{
                                float: "right",
                              }}
                            />
                          </IconButton>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "0px" }}></Grid>
                </Grid>
              </Paper>
            </div>
          ))}
        </Grid>

        <Grid item xs={3} className="animated bounceIn delay-1s">
          <Grid item>
            <Card className={classes.root1}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="150"
                  width="100"
                  image={Medical.length ? Medical[0].image : img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      width: "250px",
                      maxHeight: "130px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Medical.length ? Medical[0].content : "",
                      }}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link
                  to={`/aritcle/${
                    Medical.length ? Medical[0]._id : Medical._id
                  }`}
                  className="link"
                >
                  <IconButton>
                    {" "}
                    <span style={{ fontSize: "15px" }}>See More</span>
                    <OpenInNewIcon
                      style={{
                        float: "right",
                      }}
                    />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={3} className="animated bounceIn delay-2s">
          <Grid item>
            <Card className={classes.root1}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="150"
                  width="100"
                  image={Social.length ? Social[0].image : img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      width: "250px",
                      maxHeight: "130px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Social.length ? Social[0].content : "",
                      }}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link
                  to={`/aritcle/${Social.length ? Social[0]._id : Social._id}`}
                  className="link"
                >
                  <IconButton>
                    {" "}
                    <span style={{ fontSize: "15px" }}>See More</span>
                    <OpenInNewIcon
                      style={{
                        float: "right",
                      }}
                    />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={3} className="animated bounceIn delay-3s">
          <Grid item>
            <Card className={classes.root1}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="150"
                  width="100"
                  image={Crisis.length ? Crisis[0].image : img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      width: "250px",
                      maxHeight: "130px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Crisis.length ? Crisis[0].content : "",
                      }}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link
                  to={`/aritcle/${Crisis.length ? Crisis[0]._id : Crisis._id}`}
                  className="link"
                >
                  <IconButton>
                    {" "}
                    <span style={{ fontSize: "15px" }}>See More</span>
                    <OpenInNewIcon
                      style={{
                        float: "right",
                      }}
                    />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={3} className="animated bounceIn delay-4s">
          <Grid item>
            <Card className={classes.root1}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="150"
                  width="100"
                  image={Humor.length ? Humor[0].image : img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      width: "250px",
                      maxHeight: "130px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Humor.length ? Humor[0].content : "",
                      }}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link
                  to={`/aritcle/${Humor.length ? Humor[0]._id : Humor._id}`}
                  className="link"
                >
                  <IconButton>
                    {" "}
                    <span style={{ fontSize: "15px" }}>See More</span>
                    <OpenInNewIcon
                      style={{
                        float: "right",
                      }}
                    />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

ArticleHome.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getPosts, getCurrentProfile })(
  ArticleHome
);
