import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../models';

export const LoadTicketsAction = createAction("[Tickets] Load Tickets");

export const LoadTicketsSuccessAction = createAction("[Tickets] Load Tickets Success", props<{tickets: Ticket[]}>());

export const LoadTicketsErrorAction = createAction("[Tickets] Load Tickets Error", props<{error: string}>());

export const AddTicketAction = createAction("[Tickets] Add Ticket", props<{description: string}>());

export const AddTicketSuccessAction = createAction("[Tickets] Add Ticket Success", props<{ticket: Ticket}>());

export const AddTicketErrorAction = createAction("[Tickets] Add Ticket Error", props<{description: string}>());

export const AssignTicketAction = createAction("[Tickets] Assign Ticket", props<{ticketId: number, userId: number}>());

export const AssignTicketSuccessAction = createAction("[Tickets] Assign Ticket Success", props<{ticket: Ticket}>());

export const AssignTicketErrorAction = createAction("[Tickets] Assign Ticket Error", props<{description: string}>());

export const CompleteTicketAction = createAction("[Tickets] Complete Ticket", props<{ticketId: number}>());

export const CompleteTicketSuccessAction = createAction("[Tickets] Complete Ticket Success", props<{ticket: Ticket}>());

export const CompleteTicketErrorAction = createAction("[Tickets] Complete Ticket Error", props<{description: string}>());
