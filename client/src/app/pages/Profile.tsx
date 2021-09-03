import React from 'react'
import { Button, Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import postImg from '../assets/post.jpg';



const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            border: "2px solid",
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        avatar: {
            width: theme.spacing(25),
            height: theme.spacing(25),
        },
        border: {
            border: "2px solid",
            display: 'flex',
            justifyContent: 'center'
        },
        right: {
            border: "2px solid",
            justifyContent: 'center',
            alignItems: 'center'
        },
        center: {
            border: "2px solid red",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        bio: {
            border: "2px solid red",
        },
        img: {
            width: '90%',
            border: "2px solid orange",
        },
        container2: {
            border: "2px solid orange",
            // justifyContent: 'center',
            marginTop: 10
        }
    };
})


const Profile = () => {

    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container>
                <Grid item xs={6} className={classes.border} >
                    <Avatar src="" className={classes.avatar} />
                </Grid>
                <Grid item container xs={6} className={classes.right}>
                    <Grid item xs={8} className={classes.center}>
                        <Typography component='span'>
                            User Name Of person
                        </Typography>
                        <IconButton><EditIcon /></IconButton>
                    </Grid>
                    <Grid item xs={8} className={classes.center}>
                        <Typography component='span'>
                            Posts
                        </Typography>
                        <Typography component='span'>
                            Followers
                        </Typography>
                        <Typography component='span'>
                            Following
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.bio}>
                        <Typography>
                            Bio
                        </Typography>
                        <Typography>
                            Website
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.container2}>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
                <Grid item xs={4} className={classes.border}>
                    <img src={postImg} alt="" className={classes.img} />
                </Grid>
            </Grid>

        </Container >
    )
}

export default Profile
