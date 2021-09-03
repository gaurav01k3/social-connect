import React from 'react'
import { Box, Container, Grid, makeStyles, Theme, TextField, Button, Typography, Avatar, Hidden } from '@material-ui/core'
import loginImg from '../assets/login.png';
import userImg from '../assets/user.png';
import signImg from '../assets/sign.jpg';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
import { Link, useHistory } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            // border: '2px solid black',
            height: 'max-content',
            marginTop: 50,
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
            borderTopLeftRadius: 200,
            borderBottomRightRadius: 200,
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


const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup
        .string()
        .email('Invalid email')
        .required('Required'),
    password: Yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Required'),
})




const Signup = () => {
    const classes = useStyles();
    const history = useHistory();


    //posting signup details details
    const { mutate, error } = useMutation(
        async (data) => {
            console.log(data)
            const res = await axios(
                {
                    method: 'post',
                    url: '/api/signup',
                    data
                }
            )
            return res.data;
        },
        {
            onError: (error) => {
                console.log(error);
            },
            onSuccess: () => {
                history.push('/login');
            }
        }
    )

    return (
        <>
            <Container className={classes.root} component={Box}>
                <Grid container className={classes.content}>
                    <Hidden only={['xs', 'sm']}>
                        <Grid item md={5} alignItems='center'>
                            <Box>
                                <img className={classes.img} src={signImg} alt="" />
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xs={6} sm={8} md={4}>
                        <Box className={classes.box} boxShadow={5}>
                            <Formik
                                initialValues={{ name: "", email: "", password: "" }}
                                onSubmit={async (
                                    data,
                                    { resetForm }
                                ) => {

                                    await mutate(data as any);
                                    resetForm();
                                }}
                            // validationSchema={validationSchema}
                            >
                                {({ values }) => (
                                    < Form noValidate>
                                        {/* {
                                            console.log(errors)
                                        } */}
                                        <Box className={classes.avatar} >
                                            <Avatar src={userImg} className={classes.large} />
                                        </Box>

                                        <Grid container spacing={1} className={classes.form} alignItems="flex-end">
                                            <Grid item>
                                                <AccountCircle />
                                            </Grid>
                                            <Grid item style={{ width: '85%' }}>
                                                <Field
                                                    as={TextField}
                                                    style={{ width: '100%' }}
                                                    name="name"
                                                    type="name"
                                                    // id="input-with-icon-grid"
                                                    label="Name"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} className={classes.form} alignItems="flex-end">
                                            <Grid item>
                                                <MailOutlineIcon />
                                            </Grid>
                                            <Grid item style={{ width: '85%' }}>
                                                <Field
                                                    as={TextField}
                                                    style={{ width: '100%' }}
                                                    name="email"
                                                    type="email"
                                                    // id="input-with-icon-grid"
                                                    label="Email"
                                                />
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
                                                    // id="input-with-icon-grid"
                                                    label="Password" />
                                            </Grid>
                                        </Grid>

                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Button variant="contained" color="primary"
                                                style={{ width: '50%', margin: 10 }} type='submit'
                                            >
                                                Sign-up
                                            </Button>
                                            <Link to='/login'>
                                                <Typography variant="subtitle2" display="block" gutterBottom>
                                                    Already have an account?
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

export default Signup
