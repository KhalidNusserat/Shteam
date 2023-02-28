import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DevSettingsPageState = {
    error: string | null,
    uploadedImage: string | null,
    changedFields: {
        image: boolean,
        email: boolean,
        password: boolean
    }
};

const initialState: DevSettingsPageState = {
    error: null,
    uploadedImage: null,
    changedFields: {
        image: false,
        email: false,
        password: false
    }
};

export const devSettingsPageSlice = createSlice({
    name: 'devSettings',
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

export const { setError, setChanged, setUploadedImage, resetChanged } = devSettingsPageSlice.actions;
export default devSettingsPageSlice.reducer;