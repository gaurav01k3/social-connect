import * as React from 'react'
import { Avatar, Box, Container, makeStyles, Typography } from '@material-ui/core';
import signImage from '../../assets/sign.jpg'
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            padding: 0,
            marginBottom: 25,
            border: '4px solid'
        },
        avatar: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        postOwnerInfo: {
            display: 'flex',
            alignItems: 'center',
            padding: '5px 0 5px 15px',
            borderBottom: '0.5px solid gray'
        },
        ownerName: {
            marginLeft: 10
        },
        imgContainer: {
        },
        postImage: {
            width: '100%'
        },
        postActions: {
            border: '0.5px solid gray',
            padding: 5,
        },
        icon: {
            marginLeft: 10,
            border: '2px sold red',
            cursor: 'pointer',
        },
        likeData: {
            padding: '5px 0 5px 20px',
        }
    };
})

const PostCard = () => {

    const classes = useStyles();
    const [isLiked, setIsLiked] = React.useState(false)

    const handleLike = () => {

    }

    return (
        <>
            <Container className={classes.root}>
                <Box className={classes.postOwnerInfo}>
                    <Avatar alt="Name of creater" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                    <Typography className={classes.ownerName}>
                        Name of the user
                    </Typography>
                </Box>
                <Box className={classes.imgContainer}>
                    <img className={classes.postImage} src={signImage} alt="" />
                </Box>
                <Box className={classes.postActions}>
                    <span className={classes.icon}>
                        <LikeIcon fontSize='large' />
                    </span >
                    <span className={classes.icon}>
                        <CommentIcon fontSize='large' />
                    </span >
                </Box>
                <Box className={classes.likeData}>
                    <Typography>
                        Liked by 1000
                    </Typography>
                </Box>
            </Container >
            <Container className={classes.root}>
                <Box className={classes.postOwnerInfo}>
                    <Avatar alt="Name of creater" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                    <Typography className={classes.ownerName}>
                        Name of the user
                    </Typography>
                </Box>
                <Box className={classes.imgContainer}>
                    <img className={classes.postImage} src={signImage} alt="" />
                </Box>
                <Box className={classes.postActions}>
                    <span className={classes.icon}>
                        <LikeIcon fontSize='large' />
                    </span >
                    <span className={classes.icon}>
                        <CommentIcon fontSize='large' />
                    </span >
                </Box>
                <Box>
                    <Typography>
                        Liked by 1000
                    </Typography>
                </Box>
            </Container >
        </>
    )
}

export default PostCard
