import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import {PROBLEMS} from "../mock-problems";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // 获取所有problems
  getProblems(): Problem[] {
    return PROBLEMS;
  }

  // 获取某一problem
  getProblem(id: number): Problem {
    return PROBLEMS.find((problem) => problem.id === id);
  }
}
