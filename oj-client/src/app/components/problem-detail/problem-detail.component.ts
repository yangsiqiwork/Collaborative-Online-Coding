import { Component } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent {
  problem: Problem;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problem = this.data.getProblem(+ params["id"]);
    })
  }
}
