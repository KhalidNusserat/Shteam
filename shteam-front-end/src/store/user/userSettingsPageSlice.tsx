import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserSettingsPageState = {
    error: string | null,
    uploadedImage: string | null,
    changedFields: {
        image: boolean,
        email: boolean,
        password: boolean
    }
};

const initialState: UserSettingsPageState = {
    error: null,
    uploadedImage: null,
    changedFields: {
        image: false,
        email: false,
        password: false
    }
};

export const userSettingsPageSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        setUploadedImage: (state, action: PayloadAction<string | null>) => {
            state.uploadedImage = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setChanged: (state, action: PayloadAction<'email' | 'image' | 'password'>) => {
            state.changedFields[action.payload] = true;
        },
        resetChanged: (state, ) => {
            state.changedFields.email = false;
            state.changedFields.password = false;
            state.changedFields.image = false;
        }
    }
});

export const { setError, setChanged, setUploadedImage, resetChanged } = userSettingsPageSlice.actions;
export default userSettingsPageSlice.reducer;