import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { editTask, loadTasks, loadTasksByJobUserId, saveTask } from '../actions/task-action.service';
import { Task } from '../models/task.model';
import { TaskState } from '../reducers/task.reducer';
import { getTasks } from '../selectors/task.selectors';

@Injectable({
    providedIn: 'root'
})
export class TaskFacadeService {
    constructor(
        readonly store: Store<TaskState>
    ) { }


    loadTasks(): void {
        this.store.dispatch(loadTasks());
    }

    loadTasksByUserId(id: number): void {
        this.store.dispatch(loadTasksByJobUserId({ id: id }));
    }

    getTasks(): Observable<Task[]> {
        return this.store.select(getTasks);
    }

    saveTask(task: Task) {
        this.store.dispatch(saveTask({ task: task }));
    }

    editTask(task: Task) {
        this.store.dispatch(editTask({ task: task }))
    }
}