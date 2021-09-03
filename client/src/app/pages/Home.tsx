import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import PostCard from '../components/post/PostCard';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            // border: '2px solid',
            maxWidth: 900,
            margin: 'auto',
        },
        leftCol: {
            border: '1px solid gray'
        }
    };
})

const Home = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root} justifyContent='center'>
            <Grid item xs={10} md={8} className={classes.leftCol} >
                <PostCard />
            </Grid>
        </Grid>
    )
}

export default Home
