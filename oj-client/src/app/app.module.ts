import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { DataService} from "./services/data.service";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule    
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
