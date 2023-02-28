import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameData } from '../../helpers';
import API from '../../api/API';

type GamesStoreState = {
    games: GameData[]
};

const initialState: GamesStoreState = {
    games: []
};

export const getAllGames = createAsyncThunk(
    'gamesStore/getAllGames',
    async () => {
        return API.Game.getAllGames();
    }
)

export const gamesStoreSlice = createSlice({
    name: 'gamesStore',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<GameData[]>) => {
            state.games = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllGames.fulfilled, (state, {payload}) => {
            state.games = payload;
        });
    }
});

export const { setGames } = gamesStoreSlice.actions;
export default gamesStoreSlice.reducer;