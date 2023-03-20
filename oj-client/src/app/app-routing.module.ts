import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';

const routes: Routes = [ 
  {
    path: "",
    redirectTo: "problems",
    pathMatch: "full" 
  },
  {
    path: "problems",
    component: ProblemListComponent
  },
  {
    path: "problems/:id",
    component: ProblemDetailComponent
  },
  {
    path: "**",
    redirectTo: "problems"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
