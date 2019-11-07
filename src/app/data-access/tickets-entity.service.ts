import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay, tap, filter, map } from 'rxjs/operators';

import { Ticket } from './models';
import * as TicketsSelectors from './state/tickets/tickets.selectors';
import * as TicketsActions from './state/tickets/tickets.actions';
import { TicketsState } from './state/tickets/tickets.state';

@Injectable({
  providedIn: 'root'
})
export class TicketsEntityService {
  tickets$: Observable<Ticket[]>;
  ticketsDictionary$: Observable<Record<number, Ticket>>;
  
  constructor(private store: Store<TicketsState>) { 
    this.tickets$ = this.store.pipe(
      select(TicketsSelectors.getTickets),
      tap(tickets => {
        if(tickets.length === 0) {
          this.store.dispatch(TicketsActions.LoadTicketsAction());
        }
      }),
      shareReplay(1)
    );

    this.ticketsDictionary$ = this.store.pipe(
      select(TicketsSelectors.getTicketsDictionary),
      tap(tickets => {
        if(Object.keys(tickets).length === 0) {
          this.store.dispatch(TicketsActions.LoadTicketsAction());
        }
      }),
      shareReplay(1)
    );
  }

  addTicket(description: string) {
    this.store.dispatch(TicketsActions.AddTicketAction({description}));
  }

  assignTicket(ticketId: number, userId: number) {
    this.store.dispatch(TicketsActions.AssignTicketAction({ticketId, userId}));
  }

  completeTicket(ticketId: number) {
    this.store.dispatch(
      TicketsActions.CompleteTicketAction({ticketId})
    )
  }

  getEntityById(id: number) {
    return this.store.pipe(
      select(TicketsSelectors.getTicketById(), {id}),
      tap(ticket => {
        if(!ticket) {
          this.store.dispatch(TicketsActions.LoadTicketsAction());
        }
      })
    )
  }

  entityExists(id: number): Observable<boolean> {
    return this.ticketsDictionary$.pipe(
      tap(ticketDictionary => {
        if(Object.keys(ticketDictionary).length == 0) {
          this.store.dispatch(TicketsActions.LoadTicketsAction());
        }
      }),
      filter(ticketDictionary => Object.keys(ticketDictionary).length > 0),
      map(ticketsDictionary => ticketsDictionary.hasOwnProperty(id))
    );
  }

}