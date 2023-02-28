import { Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Centered from "../components/Centered";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import GifBackground from "../components/GifBackgroud";
import PublicPage from "../components/PublicPage";
import { useAppSelector } from "../store/store";
import API from "../api/API";
import { setError, setPassword, setUserType, setUsername } from "../store/loginPageSlice";
import { useAppDispatch } from "../store/hooks";

const LoginPage = () => {
    const navigate = useNavigate();

    const username = useAppSelector(state => state.loginPage.username);
    const password = useAppSelector(state => state.loginPage.password);
    const userType = useAppSelector(state => state.loginPage.userType);
    const error = useAppSelector(state => state.loginPage.error);
    const dispatch = useAppDispatch();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userType === 'user') {
            API.User.login(username, password)
                .then(_ => navigate('/user/home'))
                .catch(_ => {
                    dispatch(setError('Username and password do not match'));
                });
        } else {
            API.Dev.login(username, password)
                .then(_ => navigate('/dev/home'))
                .catch(_ => {
                    dispatch(setError('Username and password do not match'));
                });
        }
    }

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
                                Login to Shteam<sup>©</sup>
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <Grid
                                    container
                                    spacing={1}
                                >
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
                                            label="Password"
                                            placeholder="Password"
                                            variant="outlined"
                                            type='password'
                                            value={password}
                                            onChange={e => dispatch(setPassword(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={8} item container justifyContent='right'>
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            fullWidth
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                    <Grid xs={12} sm={4} item container justifyContent='right'>
                                        <Button fullWidth onClick={() => navigate('/signup')}>
                                            Sign Up
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

export default LoginPage;