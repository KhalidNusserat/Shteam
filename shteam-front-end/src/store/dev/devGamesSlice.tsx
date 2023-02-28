import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameData } from '../../helpers';
import API from '../../api/API';

type DevGamesState = {
    games: GameData[],
    dialogOpen: boolean,
    dialogGame: GameData
};

const initialState: DevGamesState = {
    games: [],
    dialogOpen: false,
    dialogGame: {
        name: '',
        price: 0,
        description: '',
        image: undefined
    }
};

export const getDevGames = createAsyncThunk(
    'devGames/getDevGames',
    async () => {
        return await API.Game.getGamesFromIds(await API.Dev.getGames());
    }
)

export const devGamesSlice = createSlice({
    name: 'devGames',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<GameData[]>) => {
            state.games = action.payload;
        },
        setDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.dialogOpen = action.payload;
        },
        setDialogGameName: (state, action: PayloadAction<string>) => {
            state.dialogGame.name = action.payload;
        },
        setDialogGamePrice: (state, action: PayloadAction<number>) => {
            state.dialogGame.price = action.payload;
        },
        setDialogGameDescription: (state, action: PayloadAction<string>) => {
            state.dialogGame.description = action.payload;
        },
        setDialogGameImage: (state, action: PayloadAction<string>) => {
            state.dialogGame.image = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getDevGames.fulfilled, (state, { payload }) => {
            state.games = payload;
        });
    }
});

export const { setGames, setDialogOpen, setDialogGameName, setDialogGamePrice, setDialogGameDescription, setDialogGameImage } = devGamesSlice.actions;
export default devGamesSlice.reducer;