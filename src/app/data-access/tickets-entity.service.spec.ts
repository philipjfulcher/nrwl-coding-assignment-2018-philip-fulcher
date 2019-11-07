import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { TicketsEntityService } from './tickets-entity.service';
import { TicketsState, initialTicketsState, ticketsStateName } from './state/tickets/tickets.state';
import { LoadTicketsAction } from './state/tickets/tickets.actions';

export type MockAppState = {
  Tickets: TicketsState
};

describe('Auth Guard', () => {
  let service: TicketsEntityService;
  let store: MockStore<TicketsState>;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    [ticketsStateName]: initialTicketsState
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketsEntityService,
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.get<Store<MockAppState>>(Store);
    service = TestBed.get<TicketsEntityService>(TicketsEntityService);
    dispatchSpy = spyOn(store, 'dispatch')

  });

  it('should load tickets on first subscribe to tickets$', (done) => {
    expect(store.dispatch).not.toHaveBeenCalledWith(LoadTicketsAction());

    service.tickets$.subscribe(tickets => {
      expect(store.dispatch).toHaveBeenCalledWith(LoadTicketsAction());
      done();
    });
  });

  it('should not load tickets on subscribe to tickets$ is they have already been loaded', (done) => {
    store.setState({
      [ticketsStateName]: <TicketsState>{
        loaded: true,
        loading: false,
        ticketIds: [0,1],
        tickets: {
          0: { 
            id: 0,
            description: 'Install a monitor arm',
            assigneeId: 111,
            completed: false
          },
          1: {
            id: 1,
            description: 'Move the desk to the new location',
            assigneeId: 112,
            completed: false
          }
        }
      }
    });

    service.tickets$.subscribe(tickets => {
      expect(store.dispatch).not.toHaveBeenCalledWith(LoadTicketsAction());
      done();
    });
  });
});