import { Component, OnInit } from '@angular/core';
import { Ticket, User, UsersEntityService, TicketsEntityService} from '../../data-access';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, filter, first, withLatestFrom } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket$: Observable<Ticket>;
  users$: Observable<User[]>;
  assignedUser$: Observable<User>;

  assignUserControl = new FormControl(null);

  constructor(private route: ActivatedRoute, private ticketsEntityService: TicketsEntityService, private usersEntityService: UsersEntityService) { }

  ngOnInit() {
    this.ticket$ = combineLatest(this.route.paramMap, this.ticketsEntityService.tickets$).pipe(
      map( ([paramMap, tickets]) => paramMap.get('id')),
      switchMap(id => this.ticketsEntityService.getEntityById(+id))
    );

    this.assignedUser$ = this.ticket$.pipe(
      filter(ticket => !!ticket && ticket.hasOwnProperty('assigneeId')),
      map(ticket => ticket.assigneeId),
      switchMap(id => this.usersEntityService.getEntityById(+id))
    );

    this.users$ = this.usersEntityService.users$;

    this.assignUserControl.valueChanges.pipe(
      first()
    ).subscribe(userId => this.assignTicket(userId));
  }

  completeTicket() {
    this.ticket$.pipe(
      map(ticket => ticket.id),
      first()
    ).subscribe(id => {
      this.ticketsEntityService.completeTicket(id);
    })
  }

  assignTicket(userId: number) {
    this.ticket$.pipe(
      map(ticket => ticket.id),
      first()
    ).subscribe(ticketId => {
      this.ticketsEntityService.assignTicket(ticketId, userId);
    });
  }

}