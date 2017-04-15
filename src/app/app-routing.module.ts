import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { QuestionsComponent } from './questions/questions.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'creative', component: HomeComponent,
    children: [
      { path: '', component: QuestionsComponent },
      { path: 'events', component: EventsComponent },
    ]
  },


  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
