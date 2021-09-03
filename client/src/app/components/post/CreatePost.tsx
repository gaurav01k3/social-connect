import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Box, Container, Grid, makeStyles, Theme, TextField, Button, Typography, Avatar, Hidden, Divider } from '@material-ui/core'
import * as Yup from 'yup';
import imgup from '../../assets/imageUpload.png';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Post } from '../../types';
// import FileViewer from 'react-file-viewer';


const formValidation = Yup.object().shape({

});

const useStyles = makeStyles((theme) => {
    return {
        root: {
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            height: '70vh',
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            border: '1px solid',
            borderColor: theme.palette.primary.main,
        },
        formContainer: {
            // border: '5px solid red',
            marginTop: '30px',
            height: 'max-content',
            width: '70%',
        },
        form: {
            // border: '2px solid',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        leftBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px'
        }
    };
})


const CreatePost: React.FC = () => {

    const classes = useStyles();

    const [photo, setPhoto] = React.useState<any>(null);
    const [photoLoc, setPhotoLoc] = React.useState<any>(null);
    const [photoUrl, setPhotoUrl] = React.useState<string>("");

    const { mutate } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'post',
                url: '/api/create-post',
                data
            })
            return res.data;
        }, {
        onSuccess: () => {
            alert('post created successfully');
        }
    }
    )


    //posting image and creating url from cloudinary
    const postDetails = async (data: Post) => {
        const imgdata = new FormData();
        imgdata.append("file", photoLoc);
        imgdata.append("upload_preset", "social-media");
        imgdata.append("cloud_name", "gauravcloudinary");
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/gauravcloudinary/image/upload', imgdata)
            setPhotoUrl(res.data.secure_url)
            // console.log(res.data.secure_url);
            data.image = photoUrl;
            mutate(data as any)
        } catch (error) {
            console.log(error);
        }
        // console.log(data);
    }


    const handleUpload = (e: any) => {
        e.preventDefault();
        // console.log(URL.createObjectURL(e.target.files[0]));
        setPhotoLoc(e.target.files[0]);
        setPhoto(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <>
            <Container maxWidth='md' className={classes.root}>
                <Box textAlign='center' style={{ position: 'absolute', top: 10 }}>
                    <Typography variant='h5'>New Post</Typography>
                </Box>
                <Divider />
                <Box className={classes.formContainer}>
                    <Formik
                        initialValues={{ title: "", description: "", image: "" }}
                        validationSchema={formValidation}
                        onSubmit={async (data) => {
                            data.image = photoLoc;
                            // console.log(data)
                            postDetails(data)
                        }}
                    >
                        <Form>
                            {!photo ?
                                <>
                                    <Grid container spacing={0} className={classes.form}>
                                        <Grid item xs={12} className={classes.leftBox}>
                                            <Box>
                                                <img src={imgup} alt="" />
                                            </Box>
                                            {/* <div> */}
                                            <Typography style={{ marginBottom: 15 }} variant='h6'>
                                                Upload photos here
                                            </Typography>
                                            {/* </div> */}
                                            <Button
                                                size='small'
                                                color='primary' variant='contained' component="label">
                                                <input
                                                    name='image'
                                                    type="file"
                                                    // value={photo}
                                                    hidden
                                                    onChange={(e: any) => handleUpload(e)}
                                                />
                                                Select</Button>
                                        </Grid>
                                    </Grid>
                                </> :
                                <>
                                    <Grid container spacing={10} className={classes.form}>
                                        <Grid xs={6} item>
                                            <img style={{ width: '100%', border: '1px solid gray' }} src={photo} alt="" />
                                        </Grid>
                                        <Grid xs={6} item>
                                            <Field
                                                // id="outlined-multiline-static"
                                                // label="Write a caption"
                                                name='title'
                                                type='text'
                                                as={TextField}
                                                placeholder='Title'
                                                multiline
                                                rows={4}
                                                fullWidth
                                                variant="outlined"
                                            />
                                            <Field
                                                // id="outlined-multiline-static"
                                                // label="Write a caption"
                                                name='description'
                                                type='text'
                                                as={TextField}
                                                placeholder='Write a caption'
                                                multiline
                                                rows={4}
                                                fullWidth
                                                variant="outlined"
                                            />
                                            <div style={{ marginTop: 10 }}>
                                                <Button
                                                    type='submit'
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                >
                                                    Share
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </>
                            }

                        </Form>
                    </Formik>
                </Box>
            </Container>
        </>
    )
}

export default CreatePost
