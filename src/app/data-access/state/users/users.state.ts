import { User } from '../../models';

export const usersStateName = "Users";

export interface UsersState {
  loading: boolean;
  loaded: boolean;
  users: Record<number, User>
  userIds: number[]
}

export const initialUsersState: UsersState = {
  loading: false,
  loaded: false,
  users: {},
  userIds: []
}