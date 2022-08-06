import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  firstWord: string = "";
  firstWordImage: string = "";
  secondWord: string = "";
  secondWordImage: string = "";
  searchImages: boolean;
  errorMessage: string;
  randomiseButtonEnabled: boolean = true;
  
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.generateNewWords();
  }
  
  generateNewWords() {
    this.randomiseButtonEnabled = false;
    this.errorMessage = "";
    this.dataService.getGeneratedWords().subscribe(res => {
      if(res) {
          this.randomiseButtonEnabled = true;
          this.firstWord = res[0];
          this.secondWord = res[1];

          if(this.searchImages) {
            this.dataService.getImageFromGeneratedWord(this.firstWord).subscribe(res => {
              if(res) {
                if(res.items[0].pagemap.cse_image[0].src)
                  this.firstWordImage = res.items[0].pagemap.cse_image[0].src;
              }
            }, err => {
              console.log("Error searching image", err)
              this.errorMessage = "Error searching image. It happens sometimes and I haven't fixed it yet."
            })

            this.dataService.getImageFromGeneratedWord(this.secondWord).subscribe(res => {
              if(res) {
                if(res.items[0].pagemap.cse_image[0].src)
                  this.secondWordImage = res.items[0].pagemap.cse_image[0].src;
              }
            }, err => {
              console.log("Error searching image", err)
              this.errorMessage = "Error searching image. It happens sometimes and I haven't fixed it yet."
            })
          }
      }
    }, err => {
      this.randomiseButtonEnabled = true;
      console.log(err);
    });
  }
}
