import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Toolbar } from "@mui/material";
import GameCard from "../../components/GameCard";
import GifBackground from "../../components/GifBackgroud";
import CONSTANTS from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import image from '../../img/wallpaper.gif';
import { getDevGames, setDialogGameDescription, setDialogGameImage, setDialogGameName, setDialogGamePrice, setDialogOpen } from "../../store/dev/devGamesSlice";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import PublishIcon from '@mui/icons-material/Publish';
import UploadIcon from '@mui/icons-material/Upload';
import API from "../../api/API";

const DevGames = () => {
    const games = useAppSelector(state => state.devGames.games);
    const dialogOpen = useAppSelector(state => state.devGames.dialogOpen);
    const dialogGame = useAppSelector(state => state.devGames.dialogGame);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDevGames());
    }, []);

    return (
        <GifBackground>
            <Box
                sx={{
                    width: `calc(100vw - ${CONSTANTS.DRAWER.WIDTH}px)`,
                    height: '100vh'
                }}
            >
                <Toolbar />
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    backgroundImage: `url(${image})`,
                    padding: '20px'
                }}>
                    {
                        games.map(game =>
                            <GameCard
                                game={game}
                                button='Be proud'
                                onClick={()=>{}}
                            />)
                    }
                </Box>
            </Box>
            <Fab
                variant="extended"
                color='primary'
                onClick={() => dispatch(setDialogOpen(true))}
                style={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                }}
            >
                Publish game
                <AddIcon />
            </Fab>
            <Dialog
                open={dialogOpen}
                onClose={() => dispatch(setDialogOpen(false))}
            >
                <DialogTitle>
                    Publish a brand new game
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            src={dialogGame.image!}
                            sx={{
                                width: '100%',
                                height: CONSTANTS.DEV_GAMES.GAME.IMAGE.LENGTH,
                                borderRadius: '10px'
                            }}
                            style={{
                                marginBottom: '10px'
                            }}
                        />
                    </Box>
                    <TextField
                        label="Game Name"
                        placeholder="Game Name"
                        variant="outlined"
                        value={dialogGame.name}
                        onChange={e => dispatch(setDialogGameName(e.target.value))}
                        fullWidth
                        required
                        style={{
                            marginBottom: '10px'
                        }}
                    />
                    <TextField
                        label="Game Description"
                        placeholder="Game Description"
                        variant="outlined"
                        value={dialogGame.description}
                        onChange={e => dispatch(setDialogGameDescription(e.target.value))}
                        fullWidth
                        required
                        style={{
                            marginBottom: '10px'
                        }}
                    />
                    <Box height='5px' />
                    <TextField
                        label="Game Price"
                        placeholder="Game Price"
                        variant="outlined"
                        value={dialogGame.price}
                        onChange={e => dispatch(setDialogGamePrice(Number(e.target.value)))}
                        fullWidth
                        required
                        type='number'
                        style={{
                            marginBottom: '10px'
                        }}
                    />
                    <Button component='label' fullWidth>
                        <UploadIcon /> Upload image
                        <input
                            name='image'
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(event) => {
                                dispatch(setDialogGameImage(URL.createObjectURL(event.target.files![0])));
                            }}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth onClick={() => dispatch(setDialogOpen(false))}>
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            API.Dev.newGame(dialogGame)
                                .then(() => dispatch(getDevGames()))
                                .then(() => dispatch(setDialogOpen(false)));
                        }}
                        variant="contained">
                        <PublishIcon /> Publish
                    </Button>
                </DialogActions>
            </Dialog>
        </GifBackground>
    );
};

export default DevGames;