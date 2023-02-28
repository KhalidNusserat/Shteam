import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../api/API';

type UserInfoState = {
    status: 'loading' | 'idle',
    error: string | null,
    image: string | null,
    username: string,
    email: string,
    password: string,
    games: string[]
};

const initialState: UserInfoState = {
    status: 'idle',
    error: null,
    image: null,
    username: '',
    email: '',
    password: 'password',
    games: []
};

export const getUserInfo = createAsyncThunk(
    'userInfo/fetch',
    async () => {
        const username = await API.User.getUsername();
        const email = await API.User.getEmail();
        const image = await API.User.getImage();
        return {
            image,
            username,
            email
        };
    }
)

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
            state.username = payload.username;
            state.email = payload.email;
            state.image = payload.image;
        })
    }
});

export const { setUsername, setEmail, setPassword } = userInfoSlice.actions;
export default userInfoSlice.reducer;