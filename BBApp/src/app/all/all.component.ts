import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  pets : any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.getPets();
  }

  getPets(){
    let observable = this._httpService.pets()
    observable.subscribe(data => 
      {
        console.log(data[0]);
        // data[0].sort(function(a,b){
        //   return (a.animal_type > b.animal_type) ? 1 : (         (b.last_nom > a.last_nom) ? -1 : 0)
        //   ;} 
        // );

        console.log(data);
        // var obj = JSON.parse(data.toString());
        // console.log(obj);
        // data.sort((a, b) => parseFloat(a.animal_type) - parseFloat(b.animal_type));
        //   var lates = data.sort(function(a, b){
        //   var textA = a.DepartmentName.toUpperCase();
        //   var textB = b.DepartmentName.toUpperCase();

        //   this.pets = textA;
        //   console.log(data);
        //   console.log("====================================")
        //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        this.pets = data;
      })
        
        
      // }
    // )
  }

  by(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.pets = data;
      console.log(data);
    })
  }


}
