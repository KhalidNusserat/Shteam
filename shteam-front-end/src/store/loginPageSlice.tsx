import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoginPageState = {
    username: string,
    password: string,
    userType: 'user' | 'dev',
    error: string | null
};

const initialState: LoginPageState = {
    username: '',
    password: '',
    userType: 'user',
    error: null
};

export const loginPageSlice = createSlice({
    name: 'loginPage',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setUserType: (state, action: PayloadAction<'user' | 'dev'>) => {
            state.userType = action.payload;
        }
    }
});

export const { setUsername, setPassword, setError, setUserType } = loginPageSlice.actions;
export default loginPageSlice.reducer;