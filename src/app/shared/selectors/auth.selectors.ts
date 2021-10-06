import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

const getFeatureState = createFeatureSelector<AuthState>('auth');

export const getLogin = createSelector(
    getFeatureState,
    state => state.login
);