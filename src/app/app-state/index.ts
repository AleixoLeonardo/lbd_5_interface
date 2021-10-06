import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';

import * as fromAuth from '../shared/reducers/auth.reducer';
import * as fromHistoryTask from '../shared/reducers/history-task.reducer';
import * as fromJob from '../shared/reducers/job.reducer';
import * as fromTasks from '../shared/reducers/task.reducer';
import * as fromUser from '../shared/reducers/user.reducer';

export interface State {
    auth: fromAuth.AuthState,
    user: fromUser.UserState,
    users: fromUser.UserStates,
    job: fromJob.JobState,
    task: fromTasks.TaskState,
    historyTask: fromHistoryTask.HistoryTaskState
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    user: fromUser.reducer,
    users: fromUser.reducer,
    job: fromJob.reducer,
    task: fromTasks.reducer,
    historyTask: fromHistoryTask.reducer
};

const reducerKeys = ['auth', 'user', 'user', 'job', 'task', 'historyTask'];


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];