import { Injectable } from '@angular/core';
import { createEffect , ofType, Actions} from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as TicketsActions from './tickets.actions';
import { BackendService } from '../../backend.service';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() => this.actions$.pipe(
    ofType(TicketsActions.LoadTicketsAction),
    mergeMap(() => this.backend.tickets()),
    map(tickets => TicketsActions.LoadTicketsSuccessAction({tickets}))
  
    )
  );

  addTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketsActions.AddTicketAction),
    mergeMap(({description}) => this.backend.newTicket({description})),
    map(ticket => TicketsActions.AddTicketSuccessAction({ticket}))
  
  ));

  completeTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketsActions.CompleteTicketAction),
    mergeMap(({ticketId}) => this.backend.complete(ticketId, true)),
    map(ticket => TicketsActions.CompleteTicketSuccessAction({ticket}))
  ));

  assignTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketsActions.AssignTicketAction),
    mergeMap(({ticketId, userId}) => this.backend.assign(ticketId, userId)),
    map(ticket => TicketsActions.AssignTicketSuccessAction({ticket}))
  ));
 
  constructor(
    private actions$: Actions,
    private backend: BackendService
  ) {}
}