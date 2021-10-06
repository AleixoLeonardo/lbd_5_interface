import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadHistoryTasks, loadHistoryTasksByFilter, saveHistoryTask } from '../actions/history-task-action.service';
import { HistoryTask } from '../models/history-task.module';
import { HistoryTaskState } from '../reducers/history-task.reducer';
import { getHistoryTasks } from '../selectors/history-task.selectors';



@Injectable({
    providedIn: 'root'
})
export class HistoryTaskFacadeService {
    constructor(
        readonly store: Store<HistoryTaskState>
    ) { }


    loadHistoryTasks(): void {
        this.store.dispatch(loadHistoryTasks());
    }

    loadHistoryTasksByFilter(taskId: number, start: number, end: number): void {
        this.store.dispatch(loadHistoryTasksByFilter({ taskId: taskId, start: start, end: end }));
    }

    getHistoryTasks(): Observable<HistoryTask[]> {
        return this.store.select(getHistoryTasks);
    }

    saveHistoryTasks(historyTask: HistoryTask) {
        this.store.dispatch(saveHistoryTask({ historyTask: historyTask }));
    }
}