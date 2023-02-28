import { Box, Toolbar } from "@mui/material";
import GameCard from "../../components/GameCard";
import GifBackground from "../../components/GifBackgroud";
import CONSTANTS from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getUserGames } from "../../store/user/userGamesLibrarySlice";
import image from '../../img/wallpaper.gif';
import API from "../../api/API";

const UserLibrary = () => {
    const games = useAppSelector(state => state.userGamesLibrary.games);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserGames());
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
                            button='Play'
                            onClick={(game_name) => {}}
                        />)
                    }
                </Box>
            </Box>
        </GifBackground>
    );
};

export default UserLibrary;