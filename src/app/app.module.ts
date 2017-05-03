import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { FireserviceService } from './shared/fireservice.service';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CanDeactivateGuard } from './questions/can-deactivate.guard';
import { NameGuard } from './questions/can-activate.guard';

import { GalleryComponent } from './gallery/gallery.component';
import { ToppersComponent } from './toppers/toppers.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    EventsComponent,
    QuestionsComponent,
    QuestionComponent,
    GalleryComponent,
    ToppersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  providers: [FireserviceService,CanDeactivateGuard,NameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }