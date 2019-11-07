import { Ticket } from '../../models';

export const ticketsStateName = "Tickets";

export interface TicketsState {
  loading: boolean;
  loaded: boolean;
  tickets: Record<number, Ticket>
  ticketIds: number[]
}

export const initialTicketsState: TicketsState = {
  loading: false,
  loaded: false,
  tickets: {},
  ticketIds: []
}