import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer as ticketsReducer } from './state/tickets/tickets.reducer';
import { ticketsStateName } from './state/tickets/tickets.state';
import { TicketsEffects } from './state/tickets/tickets.effects';

import { reducer as usersReducer } from './state/users/users.reducer';
import { usersStateName } from './state/users/users.state';
import { UsersEffects } from './state/users/users.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      [ticketsStateName]: ticketsReducer,
      [usersStateName]: usersReducer
    }),
    EffectsModule.forRoot([TicketsEffects, UsersEffects]),
  ],
  declarations: []
})
export class DataAccessModule { }