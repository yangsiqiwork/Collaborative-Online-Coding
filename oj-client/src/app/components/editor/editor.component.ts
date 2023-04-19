import { Component } from '@angular/core';
import { CollaborationService } from 'src/app/services/collaboration.service';

import { ActivatedRoute } from '@angular/router';

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

  sessionId: string;

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

  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
  }

  initEditor() {
    this.editor = ace.edit("editor");
    this.editor.resize();
    this.editor.setTheme("ace/theme/chrome");
    // this.editor.session.setMode("ace/mode/java");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    
    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e) => { //e:event
      console.log('editor changes: ' + JSON.stringify(e)); //便于调试
      if (this.editor.lastAppliedChange != e) { //不是重复的change
        this.collaboration.change(JSON.stringify(e));
      }
    });
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
