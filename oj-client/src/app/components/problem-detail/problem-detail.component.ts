import { Component} from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { ActivatedRoute } from '@angular/router'; //get the url to choose the id
import { DataService } from 'src/app/services/data.service';
import * as ace from 'ace-builds';


@Component({
  selector: "app-problem-detail",
  templateUrl: "./problem-detail.component.html",
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent {
  // myObject = {id:1, name:"Two Sum", desc:"None"}


  problem: Problem;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   // this.problem = this.data.getProblem(+ params["id"]);
      
    //   console.log("getProblem before")
    //   this.data.getProblem(+ params['id'])
    //     .subscribe(res => {
    //       console.log(res)
    //       console.log("getRes success")
    //       this.problem = res;
    //       console.log(this.problem)
    //       console.log("getProblem success")    
    //     });
    // })

    this.getProblem();
  }

  getProblem() {
        this.route.params.subscribe(params => {
      // this.problem = this.data.getProblem(+ params["id"]);
      
      console.log("getProblem before")
      this.data.getProblem(+ params['id'])
        .subscribe(res => {
          console.log(res);
          console.log("getRes success");
          this.problem = res;
          console.log(this.problem);
          console.log("getProblem success");
        });
    })
  };
  
  
  
}
