import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  url = "https://free-to-play-games-database.p.rapidapi.com/api/games?";
  platform = "platform=";
  category = "&category=";
  sortby = "&sort-by="

  results;

  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
    .set('x-rapidapi-host', 'free-to-play-games-database.p.rapidapi.com')
		.set('x-rapidapi-key', 'cfbd13f44emsh49f9f5296cc6046p167b01jsn7793186289b6')
  }
  getData(){
    return this.results;
  }

  getResults(platform, category, sort) {
    let fullURL = this.url + this.platform + platform + this.category + category + this.sortby + sort;

    this.results = this.http.get(fullURL, {'headers': this.headers});

  }

}

