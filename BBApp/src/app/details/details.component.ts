import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  _id: any;
  pet: any;
  rank: any;
  vote: any;
  

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.pet = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.petByID(this._id);
  }

  petByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.pet = data;
      // console.log(this.pet);
    })
  }

  upRank(pet){
    if(this.rank == null){
      this.rank = 1;
      pet.rank++;
      console.log(pet.rank);
      console.log(this.rank);
      this.vote = { _id: pet._id, rank: pet.rank };
      console.log(this.vote);

      let tempObservable = this._httpService.updateRank(pet._id, this.vote);
      tempObservable.subscribe(data => {
        this.pet = data;
        console.log(this.pet);
      })
      this.petByID(this._id);
    }
    else{
      this.rank++;
      console.log(this.rank);
      this.petByID(this._id);
    } 
  }

  deleteByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      console.log(data+ "345678765432123456789765432");
    })
    this._router.navigate(['/']); 
  }
}
