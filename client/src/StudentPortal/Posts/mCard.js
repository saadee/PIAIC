import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import img from "./i.jpg";

import { getPosts } from "../../actions/post";

const useStyles = makeStyles({
  root: {
    maxWidth: 390,
    marginTop: "50px",
    margin: "4px",
    marginLeft:'30px',
    border:'1px solid red'
    
  },
  card: {
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    // width:'800px',
    border:'2px solid green'
  },
  media: {
    height: 140
  }
});

const MediaCard = ({ getPosts, post: { posts, loading }, user }) => {
  const classes = useStyles();
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className={classes.card}>
      {posts.map(post => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={img}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.text}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Author: {post.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to='/a'  style={{
                textDecoration:'none'
            }}>
              <Button size="small" color="secondary">
                View Full Article
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
MediaCard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
  user: state.auth.user
});
export default connect(mapStateToProps, { getPosts })(MediaCard);
