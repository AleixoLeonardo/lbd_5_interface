import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState, UserStates } from '../reducers/user.reducer';

const getFeatureState = createFeatureSelector<UserStates>('users');

const getFeaturedStateUser = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(
    getFeatureState,
    state => state?.users
);

export const getUserById = createSelector(
    getFeaturedStateUser,
    state => state.user
)