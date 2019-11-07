import { Injectable } from '@angular/core';
import { createEffect , ofType, Actions} from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { BackendService } from '../../backend.service';

@Injectable()
export class UsersEffects {
  loadUser$s = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.LoadUsersAction),
    mergeMap(() => this.backend.users()),
    map(users => UsersActions.LoadUsersSuccessAction({users}))
  ));
 
  constructor(
    private actions$: Actions,
    private backend: BackendService
  ) {}

}