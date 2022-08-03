import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  APIKey = 'AIzaSyD_zEw-uhvrAFRvEW3RQegF7ZzNO3HFwi0';
  //Google Custom Search ID
  cx = '254c74f0d959b40aa';

  constructor(private http: HttpClient) {}
  
  getGeneratedWords() {
    return this.http.get<any>('cs/fetchwords.php');
  }

  getImageFromGeneratedWord(searchTerm: string) {
    return this.http.get<any>(`https://customsearch.googleapis.com/customsearch/v1?q=${searchTerm}&key=${this.APIKey}&cx=${this.cx}`);
  }
}