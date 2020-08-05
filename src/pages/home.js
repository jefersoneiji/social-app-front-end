import React, { Component } from 'react';
import axios from 'axios';
//MUI
import Grid from '@material-ui/core/Grid';

//component
import Post from '../components/Post';
import Profile from '../components/Profile';

export class home extends Component {
    state = {
        posts: null
    };
    componentDidMount() {
        axios
            .get('/posts')
            .then((response) => {
                console.log(response.data)
                this.setState({
                    posts: response.data
                });
            })
            .catch((err) => console.log(err));
    };
    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map((post) => <Post key={post.postId} post={post}></Post>)) : <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile /> 
                </Grid>
            </Grid>
        )
    }
}

export default home;
