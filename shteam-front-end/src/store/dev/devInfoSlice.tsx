import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../api/API';

type DevInfoState = {
    status: 'loading' | 'idle',
    error: string | null,
    image: string | null,
    devname: string,
    email: string,
    password: string,
    games: string[]
};

const initialState: DevInfoState = {
    status: 'idle',
    error: null,
    image: null,
    devname: '',
    email: '',
    password: 'password',
    games: []
};

export const getDevInfo = createAsyncThunk(
    'devInfo/fetch',
    async () => {
        const devname = await API.Dev.getDevName();
        const email = await API.Dev.getEmail();
        const image = await API.Dev.getImage();
        return {
            image,
            devname,
            email
        };
    }
)

export const devInfoSlice = createSlice({
    name: 'devInfo',
    initialState,
    reducers: {
        setDevName: (state, action: PayloadAction<string>) => {
            state.devname = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getDevInfo.fulfilled, (state, { payload }) => {
            state.devname = payload.devname;
            state.email = payload.email;
            state.image = payload.image;
        })
    }
});

export const { setDevName, setEmail, setPassword } = devInfoSlice.actions;
export default devInfoSlice.reducer;