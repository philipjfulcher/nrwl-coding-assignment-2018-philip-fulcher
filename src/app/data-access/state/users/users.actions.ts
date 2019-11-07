import { createAction, props } from '@ngrx/store';
import { User } from '../../models';

export const LoadUsersAction = createAction("[Users] Load Users");

export const LoadUsersSuccessAction = createAction("[Users] Load Users Success", props<{users: User[]}>());

export const LoadUsersErrorAction = createAction("[Users] Load Users Error", props<{error: string}>());