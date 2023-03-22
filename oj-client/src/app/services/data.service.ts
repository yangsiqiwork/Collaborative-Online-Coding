import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import {PROBLEMS} from "../mock-problems";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 变量problem,初始化为PROBLEMS：
  problems: Problem[] = PROBLEMS;
   
  constructor() { }

  // 获取所有problems
  getProblems(): Problem[] {
    return this.problems;
  }

  // 获取某一problem
  getProblem(id: number): Problem {
    return this.problems.find((problem) => problem.id === id);
  }

  addProblem(problem: Problem): void{
    problem.id = this.problems.length + 1;
    this.problems.push(problem)
  }
}
