import { Component, OnInit, Input } from '@angular/core';
import { Ticket, TicketsEntityService } from '../../data-access';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, distinctUntilChanged, debounceTime, withLatestFrom, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {
  tickets$: Observable<Ticket[]>;
  searchControl = new FormControl('');


  constructor(private ticketsEntityService: TicketsEntityService, private dialog: MatDialog) {
    const searchControlChanges = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500)
    );

    this.tickets$ = combineLatest(searchControlChanges, this.ticketsEntityService.tickets$).pipe(
      map( ([searchText, tickets]: [string, Ticket[]]) => {
        return tickets.filter( ticket => ticket.description.toLowerCase().includes(searchText.toLowerCase()))
      })
    );
  }

  ngOnInit() {
  }

  onAddTicketClick() {
    const dialogRef = this.dialog.open(AddTicketDialogComponent);

    dialogRef.afterClosed().subscribe( (result) => {
      if(!!result) {
        this.ticketsEntityService.addTicket(result.description);
        this.resetSearchInput();
      }
    })
  }

  resetSearchInput() {
    this.searchControl.setValue('');
  }

}