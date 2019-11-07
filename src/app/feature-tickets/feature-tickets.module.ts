import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AddTicketDialogComponent } from './add-ticket-dialog/add-ticket-dialog.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketExistsGuard } from './ticket-exists.guard.ts';

const materialModules = [
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule
];

const routes: Routes = [
  {
    path: '',
    component: TicketsListComponent
  },
  { 
    path: ':id',
    component: TicketDetailsComponent,
    canActivate: [TicketExistsGuard]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [TicketsListComponent],
  declarations: [TicketsListComponent, AddTicketDialogComponent, TicketDetailsComponent],
  entryComponents: [AddTicketDialogComponent]
})
export class FeatureTicketsModule { }