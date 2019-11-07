import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState, usersStateName }from './users.state';

export const selectUsersFeature = createFeatureSelector<UsersState>(usersStateName);

export const getUsers = createSelector(selectUsersFeature, state => {
  return state.userIds.map(id => state.users[id]);
});

export const getUsersDictionary = createSelector(selectUsersFeature, state => state.users);

export const getUserById = () =>
  createSelector(
    getUsersDictionary,
    (usersDictionary, props: {id: number}) => usersDictionary[props.id]
  );