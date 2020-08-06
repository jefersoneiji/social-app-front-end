import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import Grid from "@material-ui/core/Grid";
//redux
import { connect } from "react-redux";
import { getAllPosts } from "../redux/actions/dataActions";

//component
import Post from "../components/Post";
import Profile from "../components/Profile";

export class home extends Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = loading ? (
      posts.map((post) => <Post key={post.postId} post={post}></Post>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getAllPosts })(home);
