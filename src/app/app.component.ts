import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  firstWord: string = "";
  secondWord: string = "";
  
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.generateNewWords();
  }
  
  generateNewWords() {
    this.dataService.getGeneratedWords().subscribe(res => {
      if(res) {
          this.firstWord = res[0];
          this.secondWord = res[1];
      }
    })
  }
}
