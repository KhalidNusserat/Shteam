import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignupPageState = {
    username: string,
    email: string,
    password: string,
    userType: 'user' | 'dev',
    error: string | null,
    image: string | undefined
};

const initialState: SignupPageState = {
    username: '',
    email: '',
    password: '',
    userType: 'user',
    error: null,
    image: undefined
};

export const signupPageSlice = createSlice({
    name: 'signupPage',
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
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setUserType: (state, action: PayloadAction<'user' | 'dev'>) => {
            state.userType = action.payload;
        },
        setImage: (state, action: PayloadAction<string | undefined>) => {
            state.image = action.payload;
        }
    }
});

export const { setUsername, setPassword, setError, setUserType, setEmail, setImage } = signupPageSlice.actions;
export default signupPageSlice.reducer;