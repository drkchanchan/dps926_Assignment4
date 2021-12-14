import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inputPlatform;
  inputCategory;
  inputSort;
  

  constructor(private webService: HttpService, private router: Router) {}

  onSearch() {
    this.webService.getResults(this.inputPlatform, this.inputCategory, this.inputSort);
  }

  platformChange($event){
    this.inputPlatform = $event.target.value;
  }

  categoryChange($event){
    this.inputCategory = $event.target.value;
  }
  
  sortChange($event){
    this.inputSort = $event.target.value;
  }

}
