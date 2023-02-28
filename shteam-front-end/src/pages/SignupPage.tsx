import { Alert, Avatar, Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Centered from "../components/Centered";
import { useNavigate } from "react-router-dom";
import GifBackground from "../components/GifBackgroud";
import PublicPage from "../components/PublicPage";
import { useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import API from "../api/API";
import { setEmail, setError, setPassword, setUserType, setUsername, setImage } from "../store/signupPageSlice";
import CONSTANTS from "../constants";
import UploadIcon from '@mui/icons-material/Upload';

const SignupPage = () => {
    const navigate = useNavigate();

    const username = useAppSelector(state => state.signupPage.username);
    const email = useAppSelector(state => state.signupPage.email);
    const password = useAppSelector(state => state.signupPage.password);
    const userType = useAppSelector(state => state.signupPage.userType);
    const error = useAppSelector(state => state.signupPage.error);
    const image = useAppSelector(state => state.signupPage.image);
    const dispatch = useDispatch();

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userType === 'user') {
            API.User.signup(username, email, password, image)
                .then(_ => navigate('/user/home'))
                .catch(_ => {
                    dispatch(setError('Username already exists'));
                });
        } else {
            API.Dev.signup(username, email, password, image)
                .then(_ => navigate('/dev/home'))
                .catch(_ => {
                    dispatch(setError('Username already exists'));
                });
        }
    };

    return (
        <PublicPage>
            <GifBackground>
                <Centered>
                    <Card
                        style={{
                            maxWidth: 450,
                            padding: '5px 5px',
                            margin: '0 auto',
                            borderRadius: '10px'
                        }}
                        variant="outlined"
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                gutterBottom
                                align='center'
                                fontFamily='Tajawal'
                            >
                                Create a Shteam<sup>©</sup> Account
                            </Typography>
                            <form onSubmit={handleSignup}>
                                <Grid
                                    container
                                    spacing={1}
                                >
                                    <Grid xs={12} item>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Avatar
                                                src={image!}
                                                sx={{
                                                    width: CONSTANTS.SETTINGS.AVATAR.LENGTH,
                                                    height: CONSTANTS.SETTINGS.AVATAR.LENGTH
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid xs={12} item>
                                        {
                                            error
                                                ? <Alert severity="error">{error}</Alert>
                                                : <div></div>
                                        }
                                    </Grid>
                                    <Grid xs={12} sm={8} item>
                                        <TextField
                                            label="Username"
                                            placeholder="Username"
                                            variant="outlined"
                                            value={username}
                                            onChange={e => dispatch(setUsername(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={4} item>
                                        <Select
                                            label='User Type'
                                            labelId='user-type'
                                            value={userType}
                                            onChange={e => dispatch(setUserType(e.target.value as 'user' | 'dev'))}
                                            fullWidth
                                        >
                                            <MenuItem value='user'>User</MenuItem>
                                            <MenuItem value='dev'>Developer</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField
                                            placeholder="your@email.com"
                                            label="Email"
                                            variant="outlined"
                                            type='email'
                                            value={email}
                                            onChange={e => dispatch(setEmail(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField
                                            placeholder="Password"
                                            label="Password"
                                            variant="outlined"
                                            type='password'
                                            value={password}
                                            onChange={e => dispatch(setPassword(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Button component='label' fullWidth>
                                            <UploadIcon /> Upload image
                                            <input
                                                name='image'
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onChange={event => {
                                                    dispatch(setImage(URL.createObjectURL(event.target.files![0])));
                                                }}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={8} item container justifyContent='right'>
                                        <Button type='submit' variant='outlined' fullWidth>
                                            Create Account
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={4} item container justifyContent='right'>
                                        <Button fullWidth onClick={() => navigate('/login')}>
                                            Sign In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Centered>
            </GifBackground>
        </PublicPage>
    );
};

export default SignupPage;