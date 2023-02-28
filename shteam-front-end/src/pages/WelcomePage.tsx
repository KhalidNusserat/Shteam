import { Avatar, Button, ButtonGroup, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import Centered from "../components/Centered";
import { useNavigate } from "react-router-dom";
import GifBackground from "../components/GifBackgroud";
import PublicPage from "../components/PublicPage";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <PublicPage>
            <GifBackground>
                <Centered>
                    <Card
                        style={{
                            maxWidth: 450,
                            margin: '0 auto',
                            borderRadius: '10px'
                        }}
                        variant="outlined"
                    >
                        <CardMedia
                            sx={{
                                height: 200,
                                textShadow: '2px 2px 3px #000000'
                            }}
                            image="/static/images/banner_uncolored.png"
                        />
                        <CardContent>
                            <Typography
                                variant="h5"
                                gutterBottom
                                align='center'
                                fontFamily='Tajawal'
                            >
                                Welcome to Shteam<sup>©</sup>
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                                align='center'
                                fontFamily='Tajawal'
                            >
                                Discovery and buy exciting games.<br />Find your next favourite game here!
                            </Typography>
                        </CardContent>
                        <ButtonGroup fullWidth variant="text">
                            <Button onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button>
                            <Button onClick={() => navigate('/login')}>
                                Log In
                            </Button>
                        </ButtonGroup>
                    </Card>
                </Centered>
            </GifBackground>
        </PublicPage>
    );
};

export default WelcomePage;