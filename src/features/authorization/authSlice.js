import { createSlice } from '@reduxjs/toolkit';
import { isCurrUserLoged } from './authThunks';

const initialState = isCurrUserLoged();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loading(state) {
            state.progress.status = 'loading';
        },
        idle(state) {
            state.progress.status = 'idle';
        },
        validationProgress(state, action) {
            state.progress.message = action.payload.message;
            state.progress.code = action.payload.code;
            state.progress.status = action.payload.status;
        },
        logInUser(state, action) {
            state.user.userName = action.payload.login;
            state.user.userIsLogged = true;
        },
        logOutUser(state) {
            state.user.userName = '';
            state.user.userIsLogged = false;
        },
        addToFavorites(state, action) {
            state.favorites[action.payload.type].push(
                ...action.payload.itemObj
            );
        },
        addToHistory(state, action) {
            state.history[action.payload.type].push(...action.payload.queryObj);
        },
        removeFromFavorites(state, action) {
            state.favorites[action.payload.type].splice(
                action.payload.index,
                1
            );
        },
        removeFromHistory(state, action) {
            state.history[action.payload.type].splice(action.payload.index, 1);
        },
        clearFavoritesState(state) {
            state.favorites.films = [];
            state.favorites.people = [];
            state.favorites.planets = [];
        },
        clearHistoryState(state) {
            state.history.films = [];
            state.history.people = [];
            state.history.planets = [];
        },
    },
});

export function selectAuth(state) {
    return state.auth;
}

export const {
    loading,
    idle,
    validationProgress,
    logInUser,
    logOutUser,
    addToFavorites,
    removeFromFavorites,
    clearFavoritesState,
    addToHistory,
    removeFromHistory,
    clearHistoryState,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
