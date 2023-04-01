import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import {PROBLEMS} from "../mock-problems";
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, throwError,from,of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as bodyParser from 'body-parser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  // 变量problem,初始化为PROBLEMS：
  problems: Problem[] = PROBLEMS;


  // 获取所有problems
  getProblems(): Observable<Problem[]> {
  
  // getProblems(): Problem[] {
    // return this.problems;

    return this.http.get<Problem[]>("api/v1/problems") //调用这个api，返回observable <type>
  }

  // 获取某一problem
  getProblem(id: number): Observable<Problem> {

  // getProblem(id: number): Problem {
  //   return this.problems.find((problem) => problem.id === id);
    
    // return this.http.get("api/v1/problems/${id}")
    //                   .then((res: Response) => res.json())
    //                   .catch(this.handleError)
    // console.log("getProblem enter")
    // return this.http.get<Problem>("api/v1/problems/${id}");
    return this.http.get<Problem>(`api/v1/problems/${id}`);
  }

  addProblem(problem: Problem): Observable<Problem>{

  // addProblem(problem: Problem): void{
  //   problem.id = this.problems.length + 1;
  //   this.problems.push(problem)

    return this.http.post<Problem>('/api/v1/problems', problem, httpOptions) //problem参数
      .pipe(
        catchError(this.handleError<Problem>('addProblem faild', problem))
      );
  }

  private handleError<Problem> (operation = 'operation', result: Problem) {
    return (error: any): Observable<Problem> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return error;
    };
  }

 


}
