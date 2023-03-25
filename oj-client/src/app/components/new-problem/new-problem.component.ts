import { Component } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { DataService } from 'src/app/services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: "Easy"
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent {
  public difficulties = ["Easy", "Medium","Hard", "Super"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor(private data: DataService) {}
  addProblem(): void {
    // this.data.addProblem(this.newProblem);
    // this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
    //添加后清除
    this.data.addProblem(this.newProblem)
      .subscribe( problem => {
        console.log("addProblem success");
        this.data.getProblems();
      })
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM)

  }
}
