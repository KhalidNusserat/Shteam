import { Avatar, Button, ButtonGroup, Card, CardContent, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Centered from "../../components/Centered";
import CONSTANTS from "../../constants";
import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from "../../store/store";
import API from "../../api/API";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import GifBackground from "../../components/GifBackgroud";
import { getDevInfo, setEmail, setPassword } from "../../store/dev/devInfoSlice";
import { resetChanged, setChanged, setError, setUploadedImage } from "../../store/dev/devSettingsPageSlice";

const DevSettings = () => {
    const image = useAppSelector(state => state.devInfo.image);
    const uploadedImage = useAppSelector(state => state.devSettingsPage.uploadedImage);
    const devname = useAppSelector(state => state.devInfo.devname);
    const email = useAppSelector(state => state.devInfo.email);
    const password = useAppSelector(state => state.devInfo.password);
    const changedFields = useAppSelector(state => state.devSettingsPage.changedFields);
    const isChanged = useAppSelector(state => {
        return Object.values<boolean>(state.devSettingsPage.changedFields).some(x => x);
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDevInfo());
    }, []);

    useEffect(() => {
        dispatch(setUploadedImage(image));
    }, [image]);

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUploadedImage(URL.createObjectURL(event.target.files![0])));
        dispatch(setChanged('image'));
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(event.target.value));
        dispatch(setChanged('email'));
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(event.target.value));
        dispatch(setChanged('password'));
    }

    const handleSaveChanges = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        API.Dev.updateProfile(
            changedFields.email ? email : null,
            changedFields.password ? password : null,
            changedFields.image ? uploadedImage : null
        )
            .then(() => dispatch(resetChanged()))
            .catch(_ => setError('Could\'t update profile due to an error, sorry :('));
    }

    return (
        <Box
            component='main'
            width={`calc(100vw - ${CONSTANTS.DRAWER.WIDTH}px)`}
        >
            <GifBackground>
                <Centered>
                    <Card
                        style={{
                            padding: '5px 5px',
                            margin: '0 auto',
                            borderRadius: '10px'
                        }}
                        variant="outlined"
                    >
                        <CardContent>
                            <form onSubmit={handleSaveChanges}>
                                <Grid
                                    container
                                    spacing={1}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid xs={12} item>
                                        <Avatar
                                            src={uploadedImage!}
                                            sx={{
                                                width: CONSTANTS.SETTINGS.AVATAR.LENGTH,
                                                height: CONSTANTS.SETTINGS.AVATAR.LENGTH
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12} item width={CONSTANTS.SETTINGS.TEXTFIELD.WIDTH}>
                                        <TextField
                                            label='Developer Name'
                                            name="devname"
                                            value={devname}
                                            variant="outlined"
                                            style={{
                                                opacity: 1
                                            }}
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid xs={12} item width={CONSTANTS.SETTINGS.TEXTFIELD.WIDTH}>
                                        <TextField
                                            label='Email'
                                            name='email'
                                            value={email}
                                            onChange={handleEmailChange}
                                            variant="outlined"
                                            style={{
                                                opacity: 1
                                            }}
                                            type='email'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid xs={12} item width={CONSTANTS.SETTINGS.TEXTFIELD.WIDTH}>
                                        <TextField
                                            label='Password'
                                            name='password'
                                            value={password}
                                            onChange={handlePasswordChange}
                                            variant="outlined"
                                            style={{
                                                opacity: 1
                                            }}
                                            type='password'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid xs={12} item width={CONSTANTS.SETTINGS.TEXTFIELD.WIDTH}>
                                        <ButtonGroup fullWidth variant="text">
                                            <Button disabled={!isChanged} type="submit">
                                                <SaveIcon /> Save changes
                                            </Button>
                                            <Button component='label'>
                                                <UploadIcon /> Upload new image
                                                <input
                                                    name='image'
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={handleUploadImage}
                                                />
                                            </Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Centered>
            </GifBackground>
        </Box>
    );
}

export default DevSettings;