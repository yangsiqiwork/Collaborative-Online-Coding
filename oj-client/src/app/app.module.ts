import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { DataService} from "./services/data.service";
import { RouterModule } from '@angular/router';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,  
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-q0but430kmcrf8yv.us.auth0.com',
      clientId: 'Wk8URPptpeZGAk6VUFwXfXoVrKmLElsw',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
  //   {
  //   provide: "data",
  //   useClass: DataService
  // }
  DataService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
