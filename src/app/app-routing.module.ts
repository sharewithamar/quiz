import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { QuestionsComponent } from './questions/questions.component';
import { CanDeactivateGuard } from './questions/can-deactivate.guard';
import { GalleryComponent } from './gallery/gallery.component';
import { ToppersComponent } from './toppers/toppers.component';
import { NameGuard } from './questions/can-activate.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'creative', component: HomeComponent,
    children: [
      { path: '', component: QuestionsComponent,canDeactivate: [CanDeactivateGuard],canActivate:[NameGuard] },
      { path: 'events', component: EventsComponent },
      { path: 'toppers', component: ToppersComponent },
      { path: 'gallery', component: GalleryComponent }
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
