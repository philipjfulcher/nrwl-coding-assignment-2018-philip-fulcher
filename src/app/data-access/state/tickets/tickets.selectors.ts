import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TicketsState, ticketsStateName }from './tickets.state';

export const selectTicketsFeature = createFeatureSelector<TicketsState>(ticketsStateName);

export const getTickets = createSelector(selectTicketsFeature, state => {
  return state.ticketIds.map(id => state.tickets[id]);
});

export const getTicketsDictionary = createSelector(selectTicketsFeature, state => state.tickets);

export const getTicketById = () =>
  createSelector(
    getTicketsDictionary,
    (ticketsDictionary, props: {id: number}) => ticketsDictionary[props.id]
  );