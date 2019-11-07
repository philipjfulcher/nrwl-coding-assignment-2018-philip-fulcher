import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TicketsEntityService } from '../data-access';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TicketExistsGuard implements CanActivate {
  constructor(private ticketsEntityService: TicketsEntityService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.ticketsEntityService.entityExists(+next.paramMap.get('id')).pipe(
      tap(ticketExists => {
        if(!ticketExists) {
          this.router.navigate(['./tickets']);
      }})
    );
  }
}
