import React from 'react'
import { Box, Container, Grid, makeStyles, Theme, TextField, Button, Typography, Avatar, Hidden } from '@material-ui/core'
import loginImg from '../assets/login.png';
import userImg from '../assets/user.png';
import { Field, Formik, Form } from 'formik';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
import { Link, useHistory } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useMutation } from 'react-query';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            // border: '2px solid black',
            height: 'max-content',
            marginTop: 100,
        },
        content: {
            // border: '2px solid red',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        },
        img: {
            width: '100%'
        },
        box: {
            // border: '2px solid',
            padding: theme.spacing(8),
            borderTopRightRadius: 150,
            borderBottomLeftRadius: 150,
        },
        form: {
            width: '100%',
            marginBottom: 10,
        },
        avatar: {
            display: 'flex',
            justifyContent: 'center',
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    };
})



const Login = () => {
    const classes = useStyles();
    const history = useHistory();


    //posting login details
    const { mutate, error } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'post',
                url: '/api/login',
                data
            })
            return res.data;
        }, {
        onSuccess: (data) => {
            console.log(data);
            history.push('/');
        }
    }
    )

    return (
        <>
            <Container className={classes.root} component={Box}>
                <Grid container className={classes.content}>
                    <Hidden only={['xs', 'sm']}>
                        <Grid item md={4} alignItems='center'>
                            <Box>
                                <img className={classes.img} src={loginImg} alt="" />
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xs={6} sm={8} md={4}>
                        <Box className={classes.box} boxShadow={5}>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={async (data, { setSubmitting }) => {
                                    setSubmitting(true);
                                    // async call 
                                    console.log(data);
                                    await mutate(data as any);
                                    setSubmitting(false);
                                }}
                            >
                                {({ values, isSubmitting }) => (
                                    <Form>

                                        <Box className={classes.avatar} >
                                            <Avatar src={userImg} className={classes.large} />
                                        </Box>
                                        <Grid container spacing={1} className={classes.form} alignItems="flex-end">
                                            <Grid item>
                                                <MailOutlineIcon />
                                            </Grid>
                                            <Grid item style={{ width: '85%' }}>
                                                <Field
                                                    as={TextField}
                                                    style={{ width: '100%' }} name="email"
                                                    type="email"
                                                    label="Email" />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} className={classes.form} alignItems="flex-end">
                                            <Grid item>
                                                <LockIcon />
                                            </Grid>
                                            <Grid item style={{ width: '85%' }}>
                                                <Field
                                                    as={TextField}
                                                    style={{ width: '100%' }}
                                                    name="password"
                                                    type="password"
                                                    label="Password" />
                                            </Grid>
                                        </Grid>

                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Button
                                                variant="contained" color="primary"
                                                style={{ width: '50%', margin: 10 }} type='submit'
                                                disabled={isSubmitting}
                                            >
                                                Login
                                            </Button>
                                            <Link to='/signup'>
                                                <Typography variant="subtitle2" display="block" gutterBottom>
                                                    Create an account?
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Login
