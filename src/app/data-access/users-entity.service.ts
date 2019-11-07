import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TicketsState } from './tickets.state';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import {User } from '../../models';
import * as UsersSelectors from './state/users/users.selectors';
import * as UsersActions from './state/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersEntityService {
  users$: Observable<User[]>;
  usersDictionary$: Observable<Record<number, User>>;
  
  constructor(private store: Store<TicketsState>) { 
    this.users$ = this.store.pipe(
      select(UsersSelectors.getUsers),
      tap(users => {
        if(users.length === 0) {
          this.store.dispatch(UsersActions.LoadUsersAction());
        }
      }),
      shareReplay(1)
    );

    this.usersDictionary$ = this.store.pipe(
      select(UsersSelectors.getUsersDictionary),
      shareReplay(1)
    );
  }

  getEntityById(id: number) {
    return this.store.pipe(
      select(UsersSelectors.getUserById(), {id}),
      tap(user => {
        if(!user) {
          this.store.dispatch(UsersActions.LoadUsersAction());
        }
      })
    
    )
  }

}