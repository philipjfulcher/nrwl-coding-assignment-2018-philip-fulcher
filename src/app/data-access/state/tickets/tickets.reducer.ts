import { createReducer, on, State, Action } from '@ngrx/store';
import { TicketsState, initialTicketsState } from './tickets.state';
import * as TicketActions from './tickets.actions';

export const ticketsReducer = createReducer(initialTicketsState,
  on(TicketActions.LoadTicketsAction, state => {
    const next = cloneState(state);
    next.loading = true;

    return state;
  }),
  on(TicketActions.LoadTicketsSuccessAction, (state, {tickets}) => {
    const next = cloneState(state);

    next.loading = false;
    next.loaded = true;
    next.tickets = tickets.reduce( (acc, ticket) => { 
      acc[ticket.id] = ticket
      return acc;
    }, {});
    next.ticketIds = tickets.map( ticket => ticket.id);

    return next;
  }),
  on(TicketActions.LoadTicketsErrorAction, state => {
    const next = cloneState(state);

    next.loading = false;

    return next;
  }),
  on(TicketActions.AddTicketSuccessAction, (state, {ticket}) => {
    const next = cloneState(state);

    next.ticketIds.push(ticket.id);
    next.tickets[ticket.id] = ticket;

    return next;
  }),
  on(TicketActions.AssignTicketSuccessAction, TicketActions.CompleteTicketSuccessAction, (state, {ticket}) => {
    const next = cloneState(state);

    next.tickets[ticket.id] = ticket;
    
    return next;
  })
);

export function reducer(state: TicketsState | undefined, action: Action) {
  return ticketsReducer(state, action);
}

function cloneState(state: TicketsState): TicketsState {
  return {
    ...state,
    tickets: {...state.tickets},
    ticketIds: [...state.ticketIds] 
  }
}