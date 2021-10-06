import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

import { editUser, loadUserById, loadUsers, saveUser } from '../actions/user-action.service';
import { UserState } from '../reducers/user.reducer';
import { getUserById, getUsers } from '../selectors/user.selectors';



@Injectable({
    providedIn: 'root'
})
export class UserFacadeService {
    constructor(
        readonly store: Store<UserState>
    ) { }


    loadUsers(): void {
        this.store.dispatch(loadUsers());
    }

    getUsers(): Observable<User[]> {
        return this.store.select(getUsers);
    }

    saveUser(user: User) {
        this.store.dispatch(saveUser({ user: user }));
    }

    editUser(user: User) {
        this.store.dispatch(editUser({ user: user }))
    }

    loadUserById(id: number): void {
        this.store.dispatch(loadUserById({ id: id }));
    }

    getUserById(): Observable<User> {
        return this.store.select(getUserById);
    }
}