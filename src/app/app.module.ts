import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './data-access/backend.service';
import {StoreModule } from '@ngrx/store';
import { DataAccessModule }from './data-access/';


import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { FeatureTicketsModule } from './feature-tickets/feature-tickets.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tickets',
    loadChildren: () => import('./feature-tickets/feature-tickets.module').then(m => m.FeatureTicketsModule)
  },
  { path: '',   redirectTo: '/tickets', pathMatch: 'full' },
];

const materialModules = [
  MatCardModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    DataAccessModule,
    ...materialModules
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
