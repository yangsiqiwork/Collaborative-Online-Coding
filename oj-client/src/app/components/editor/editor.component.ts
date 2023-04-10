import { Component } from '@angular/core';

declare var ace: any; //set to global variable to connect with ace-builds js...


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {


  editor: any;  //set ace editor as private variable

  public languages: string[] = ['Java', 'C++', "Python"];
  language: string = 'Java'

  defaultContent = {
    'Java' : `public class Example {
      public static void main(String[] args) {
        // Type your code here
      }
}`,
    'C++' : `#include <iostream>
    using namespace std;
    
    int main() {
      //Type your C++ code here
      return 0;
    }`,
    'Python' : `class Solution:
    def exmple():
      #Write your Python code here
    `
  }

  constructor() {

  }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.resize();
    this.editor.setTheme("ace/theme/chrome");
    this.editor.session.setMode("ace/mode/java");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    if (this.language == "C++") {
      this.editor.session.setMode("ace/mode/c_cpp");
    } else {
      this.editor.session.setMode("ace/mode/" + this.language.toLowerCase());
    }
    
    // this.editor.session.setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode)
  }

}
