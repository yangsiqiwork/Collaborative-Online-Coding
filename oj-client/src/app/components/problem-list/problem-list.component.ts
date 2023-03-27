import { Component, Inject, OnInit } from '@angular/core';
import { Problem } from "../../models/problem.model";
// import { PROBLEMS } from "../../mock-problems"; /*用service替代。*/
import { DataService } from 'src/app/services/data.service';


// const PROBLEMS: Problem[] = [
//   {
//     id: 1,
//     name: "Two sum",
//     desc: "1XXXXXXXXXX",
//     difficulty: "easy"
//   },
//   {
//     id: 2,
//     name: "3 sum",
//     desc: "2XXXXXXXXXX",
//     difficulty: "medium"
//   },
//   {
//     id: 3,
//     name: "4 sum",
//     desc: "3XXXXXXXXXX",
//     difficulty: "hard"
//   }

// ];

@Component({
  selector: "app-problem-list",
  templateUrl: "./problem-list.component.html",
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit{
  // problems: Problem[]; 
  problems: Problem[] = [];
  

  // Inject global provider "data", called data here as private field
  constructor(private data: DataService){}

  ngOnInit(){ //接口，class建立时会运行这个，初始化

    // this.problems  = PROBLEMS; 
    this.getProblems();
  }

  getProblems(): void{
    // this.problems = this.data.getProblems();
    console.log("call ProblemListComponent.getProblems");

    this.data.getProblems()
      .subscribe(problems => {
        console.log("getProblems success")
        console.log(problems);
        this.problems = problems;
      });
  }
  onAddProblemButtonClick() {
    this.getProblems();
  }
  
}
