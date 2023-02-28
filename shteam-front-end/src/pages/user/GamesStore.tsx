import { Box, Toolbar } from "@mui/material";
import GameCard from "../../components/GameCard";
import GifBackground from "../../components/GifBackgroud";
import CONSTANTS from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import image from '../../img/wallpaper.gif';
import { getAllGames } from "../../store/user/gamesStoreSlice";
import API from "../../api/API";

const GamesStore = () => {
    const games = useAppSelector(state => state.gamesStore.games);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllGames());
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
                            button='Buy'
                            onClick={(game_name) => {
                                API.User.buyGame(game_name);
                            }}
                        />)
                    }
                </Box>
            </Box>
        </GifBackground>
    );
};

export default GamesStore;