import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../DashBoard/userProfile/spinner";
import Navbar from "./appbar";
import Typography from "@material-ui/core/Typography";
import { getCurrentProfile } from "../../actions/profile";
import Card from "./mCard";
import ArticelCard from "./ArticleCard";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345
//   },
//   media: {
//     height: 140
//   }
// });
const Posts = ({ getPosts, post: { posts, loading }, user }) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getPosts]);
  // const classes = useStyles();

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Navbar />
      <ArticelCard />
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
  user: state.auth.user
});
export default connect(mapStateToProps, { getPosts })(Posts);
