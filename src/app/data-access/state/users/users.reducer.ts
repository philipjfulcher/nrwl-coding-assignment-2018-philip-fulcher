import { createReducer, on, State, Action } from '@ngrx/store';
import { UsersState, initialUsersState } from './users.state';
import * as UserActions from './users.actions';

export const usersReducer = createReducer(initialUsersState,
  on(UserActions.LoadUsersAction, state => {
    const next = cloneState(state);

    next.loading = true;

    return state;
  }),
  on(UserActions.LoadUsersSuccessAction, (state, {users}) => {
    const next = cloneState(state);

    next.loading = false;
    next.loaded = true;
    next.users = users.reduce( (acc, user) => { 
      acc[user.id] = user
      return acc;
    }, {});
    next.userIds = users.map( ticket => ticket.id);

    return next;
  }),
  on(UserActions.LoadUsersErrorAction, state => {
    const next = cloneState(state);

    next.loading = false;
    
    return next;
  })
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}

function cloneState(state: UsersState): UsersState {
  return {
    ...state,
    users: {...state.users},
    userIds: [...state.userIds] 
  }
}